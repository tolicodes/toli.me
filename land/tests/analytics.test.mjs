import assert from "node:assert/strict";
import test from "node:test";
import { cleanUrl, sanitizeEvent, startAnalytics } from "../src/analytics-policy.js";

const site = "toli.me";
function fixture(overrides = {}) {
  const calls = [];
  const listeners = {};
  const win = { location: { hostname: site, href: "https://toli.me/?token=secret#/travels" }, navigator: {}, addEventListener: (name, fn) => { listeners[name] = fn; }, ...overrides };
  const client = { init: (key, config) => { calls.push(["init", key, config]); config.loaded(client); }, register: (value) => calls.push(["register", value]), capture: (...args) => calls.push(["capture", ...args]), startSessionRecording: () => calls.push(["replay"]) };
  return { calls, listeners, win, client, options: { projectToken: "phc_test", apiHost: "https://us.i.posthog.com", site, win, hashRouting: true } };
}

test("does not initialize on previews, missing configuration or privacy opt-out", () => {
  for (const overrides of [{ location: { hostname: "beta.toli.me" } }, { navigator: { doNotTrack: "1" } }, { navigator: { globalPrivacyControl: true } }]) {
    const f = fixture(overrides);
    assert.equal(startAnalytics(f.client, f.options), false);
    assert.equal(f.calls.length, 0);
  }
  const f = fixture();
  assert.equal(startAnalytics(f.client, { ...f.options, projectToken: "" }), false);
});

test("retains public routes while removing URL credentials, queries and unknown hashes", () => {
  assert.equal(cleanUrl("https://user:pass@toli.me/?token=secret#/travels"), "https://toli.me/#/travels");
  assert.equal(cleanUrl("https://tolicodes.com/?email=private#access-token"), "https://tolicodes.com/");
});

test("sanitizes event, initial referrer and clicked-link metadata without mutating originals", () => {
  const event = { event: "$autocapture", properties: { $current_url: "https://toli.me/?secret=1", $search: "?secret=1", $set_once: { $initial_referrer: "https://example.com/?secret=2" }, $elements: [{ attr__href: "https://example.com/?secret=3", attr__value: "private" }] } };
  const clean = sanitizeEvent(event);
  assert.equal(clean.properties.$current_url, "https://toli.me/");
  assert.equal(clean.properties.$search, undefined);
  assert.equal(clean.properties.$set_once.$initial_referrer, "https://example.com/");
  assert.deepEqual(clean.properties.$elements, [{ attr__href: "https://example.com/" }]);
  assert.equal(event.properties.$elements[0].attr__value, "private");
});

test("records initial and hash-route pageviews with masked inputs and no console/network payloads", () => {
  const f = fixture();
  assert.equal(startAnalytics(f.client, f.options), true);
  const config = f.calls[0][2];
  assert.equal(config.session_recording.maskAllInputs, true);
  assert.equal(config.session_recording.recordHeaders, false);
  assert.equal(config.session_recording.recordBody, false);
  assert.equal(config.session_recording.maskCapturedNetworkRequestFn({}), null);
  assert.equal(config.enable_recording_console_log, false);
  assert.equal(config.person_profiles, "never");
  assert.equal(config.cross_subdomain_cookie, false);
  assert.deepEqual(f.calls[2], ["capture", "$pageview", { $current_url: "https://toli.me/#/travels" }]);
  f.win.location.href = "https://toli.me/?email=private#/creative";
  f.listeners.hashchange();
  assert.deepEqual(f.calls.at(-1), ["capture", "$pageview", { $current_url: "https://toli.me/#/creative" }]);
  assert.ok(f.calls.some(([name]) => name === "replay"));
});
