import { startAnalytics } from "./analytics-policy.js";
import { POSTHOG_PROJECT_TOKEN, POSTHOG_API_HOST } from "./posthog-config.js";

// Local development, previews and beta aliases never send visitor telemetry.
if (import.meta.env.PROD && POSTHOG_PROJECT_TOKEN && window.location.hostname === "toli.me") {
  import("posthog-js").then(({ default: posthog }) => {
    startAnalytics(posthog, {
      projectToken: POSTHOG_PROJECT_TOKEN,
      apiHost: POSTHOG_API_HOST,
      site: "toli.me",
      win: window,
      hashRouting: true,
    });
  }).catch(() => { /* Analytics must never prevent the site from rendering. */ });
}
