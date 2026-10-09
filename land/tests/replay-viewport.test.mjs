import assert from "node:assert/strict";
import { test } from "node:test";
import { startAnalytics } from "../src/analytics-policy.js";
import { LazyLoadedSessionRecording } from "../node_modules/posthog-js/lib/src/extensions/replay/external/lazy-loaded-session-recorder.js";

test("real SDK replay URL masking preserves viewport metadata and rejects request payloads", () => {
  let config;
  startAnalytics({init: (_, value) => config = value}, {
    projectToken: "public-test-token", apiHost: "https://us.i.posthog.com",
    site: "toli.me", win: { location: {hostname:"toli.me",href:"https://toli.me/"}, navigator: {} }
  });
  const recorder = Object.create(LazyLoadedSessionRecording.prototype);
  recorder._instance = {config};
  assert.equal(recorder._maskReplayUrl("https://toli.me/?token=private#private"), "https://toli.me/");
  const mask = config.session_recording.maskCapturedNetworkRequestFn;
  assert.equal(mask({name:"https://toli.me/api?token=private",method:"POST",requestBody:"private",responseBody:"private",headers:{authorization:"private"}}), null);
  assert.equal(mask({}), null);
  assert.equal(config.session_recording.recordHeaders, false);
  assert.equal(config.session_recording.recordBody, false);
});
