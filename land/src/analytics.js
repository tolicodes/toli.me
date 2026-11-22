import { startAnalytics } from './analytics-policy.js';

if (import.meta.env.PROD) {
  startAnalytics({ projectId: 'zc1y6r5zmf', site: 'toli.me', win: window, doc: document });
}
