// Shared policy for these public sites only. Never reuse on an authenticated app unchanged.
export function cleanUrl(value) {
  if (typeof value !== "string") return value;
  try {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) return value;
    url.username = "";
    url.password = "";
    url.search = "";
    // Only the Personal Index's known public collection routes are retained.
    if (!/^#\/(?:publications|creative|writing|travels)?$/.test(url.hash)) url.hash = "";
    return url.href;
  } catch { return value; }
}

export function sanitizeEvent(event) {
  if (!event) return event;
  const properties = { ...event.properties };
  for (const key of ["$current_url", "$referrer", "$initial_referrer", "$initial_current_url", "$prev_pageview_pathname"]) {
    if (key in properties) properties[key] = cleanUrl(properties[key]);
  }
  delete properties.$search;
  delete properties.$initial_search;
  for (const key of ["$set", "$set_once"]) {
    if (properties[key]) properties[key] = sanitizeEvent({ properties: properties[key] }).properties;
  }
  if (Array.isArray(properties.$elements)) {
    properties.$elements = properties.$elements.map((element) => {
      const clean = { ...element };
      if (clean.attr__href) clean.attr__href = cleanUrl(clean.attr__href);
      delete clean.attr__value;
      return clean;
    });
  }
  return { ...event, properties };
}

export function startAnalytics(client, { projectToken, apiHost, site, win, hashRouting = false }) {
  if (!projectToken || win.location.hostname !== site || win.navigator.doNotTrack === "1" || win.navigator.globalPrivacyControl) return false;
  client.init(projectToken, {
    api_host: apiHost,
    ui_host: "https://us.posthog.com",
    defaults: "2025-11-30",
    person_profiles: "never",
    cross_subdomain_cookie: false,
    respect_dnt: true,
    capture_pageview: false,
    capture_pageleave: false,
    capture_performance: false,
    capture_exceptions: false,
    disable_surveys: true,
    enable_recording_console_log: false,
    autocapture: {
      dom_event_allowlist: ["click"],
      capture_copied_text: false,
      element_attribute_ignorelist: ["value"],
    },
    session_recording: {
      maskAllInputs: true,
      blockSelector: '[data-private], .ph-no-capture, input[type="hidden"], input[type="file"]',
      recordHeaders: false,
      recordBody: false,
      maskCapturedNetworkRequestFn: () => null,
    },
    before_send: sanitizeEvent,
    loaded: (instance) => {
      instance.register({ site });
      const pageview = () => instance.capture("$pageview", { $current_url: cleanUrl(win.location.href) });
      pageview();
      if (hashRouting) win.addEventListener("hashchange", pageview);
      instance.startSessionRecording();
    },
  });
  return true;
}
