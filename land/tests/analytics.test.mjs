import assert from 'node:assert/strict';
import test from 'node:test';
import { startAnalytics } from '../src/analytics-policy.js';

function fixture() {
  const scripts = [], attributes = [];
  const win = { location: { hostname: 'toli.me', href: 'https://toli.me/' }, navigator: {} };
  const doc = { referrer: '', querySelector: () => scripts[0], querySelectorAll: () => [{ setAttribute: (...args) => attributes.push(args) }], createElement: () => ({ setAttribute() {} }), head: { appendChild: (script) => scripts.push(script) } };
  return { projectId: 'zb5fa2mqgu', site: 'toli.me', win, doc, scripts, attributes };
}

test('production capture masks inputs and denies cookies before inserting one official tag', () => {
  const f = fixture();
  assert.equal(startAnalytics(f), true);
  assert.equal(f.scripts[0].src, 'https://www.clarity.ms/tag/zb5fa2mqgu');
  assert.equal(f.scripts[0].async, true);
  assert.deepEqual(f.win.clarity.q, [['consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' }], ['set', 'site', f.site]]);
  assert.deepEqual(f.attributes, [['data-clarity-mask', 'true']]);
  assert.equal(startAnalytics(f), false);
  assert.equal(f.scripts.length, 1);
});

test('previews, opt-outs, missing IDs and credential-bearing URLs never load a collector', () => {
  const changes = [
    f => { f.win.location.hostname = 'preview.example.com'; },
    f => { f.win.navigator.doNotTrack = '1'; },
    f => { f.win.navigator.globalPrivacyControl = true; },
    f => { f.projectId = ''; },
    f => { f.win.location.href += '?token=private'; },
    f => { f.win.location.href += '#access-token'; },
    f => { f.doc.referrer = 'https://example.com/?token=private'; },
  ];
  for (const change of changes) {
    const f = fixture(); change(f);
    assert.equal(startAnalytics(f), false);
    assert.equal(f.scripts.length, 0);
  }
});

test('blocked scripts and DOM failures cannot break rendering', () => {
  const f = fixture();
  f.doc.createElement = () => { throw new Error('unavailable'); };
  assert.equal(startAnalytics(f), false);
});

test('known public collection deep links record while unknown hashes stay excluded', () => {
  const f = fixture(); f.win.location.href += '#/travels';
  assert.equal(startAnalytics(f), true);
});
