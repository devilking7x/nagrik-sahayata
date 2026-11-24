'use strict';
/* Node tests for Nagrik Sahayata core logic (app.js).
 * Run: node --test tests/test.js
 */
const test = require('node:test');
const assert = require('node:assert');
const app = require('../app.js');

test('guides: 6 guides, each with Hindi+English steps and at least one official link', () => {
  assert.strictEqual(app.GUIDES.length, 6);
  for (const g of app.GUIDES) {
    assert.ok(g.id && g.titleHi && g.titleEn, g.id);
    assert.ok(g.stepsHi.length >= 4 && g.stepsEn.length === g.stepsHi.length, g.id);
    assert.ok(g.docsHi.length >= 3, g.id);
    assert.ok(g.links.length >= 1 && g.links[0].url.startsWith('https://'), g.id);
  }
});

test('getGuide returns the guide and null for unknown ids', () => {
  assert.strictEqual(app.getGuide('rti').id, 'rti');
  assert.strictEqual(app.getGuide('nope'), null);
});

test('searchGuides: empty query returns all; Hindi and English queries match; no-match returns empty', () => {
  assert.strictEqual(app.searchGuides('').length, 6);
  assert.strictEqual(app.searchGuides('   ').length, 6);
  assert.ok(app.searchGuides('RTI').some((g) => g.id === 'rti'));
  assert.ok(app.searchGuides('राशन').some((g) => g.id === 'ration'));
  assert.ok(app.searchGuides('1930').some((g) => g.id === 'cybercrime'));
  assert.strictEqual(app.searchGuides('zzzzqqq').length, 0);
  assert.strictEqual(app.searchGuides(null).length, 6);
});

test('filterGuidesByCategory: all + each category', () => {
  assert.strictEqual(app.filterGuidesByCategory('all').length, 6);
  assert.strictEqual(app.filterGuidesByCategory('cyber').length, 1);
  assert.strictEqual(app.filterGuidesByCategory('shikayat').length, 2);
  assert.strictEqual(app.filterGuidesByCategory('unknown-cat').length, 0);
});

test('buildLetter: RTI letter renders in Hindi with all fields filled', () => {
  const res = app.buildLetter('rti-letter', {
    name: 'Asha Verma', address: 'Shirur, Maharashtra',
    department: 'नगर निगम, शिरूर', question: 'पिछले 3 माह में सड़क मरम्मत पर खर्च की जानकारी दें।',
    date: '2026-11-24'
  }, 'hi');
  assert.strictEqual(res.ok, true);
  assert.ok(res.text.includes('Asha Verma'));
  assert.ok(res.text.includes('नगर निगम'));
  assert.ok(res.text.includes('सूचना का अधिकार अधिनियम, 2005'));
  assert.ok(res.text.includes('2026-11-24'));
});

test('buildLetter: English letter renders with English subject line', () => {
  const res = app.buildLetter('consumer-letter', {
    name: 'Ravi Kumar', address: 'Pune', seller: 'ABC Mobiles',
    details: 'Bill 123, 2026-11-01, phone stopped working, Rs 12,000.'
  }, 'en');
  assert.strictEqual(res.ok, true);
  assert.ok(res.text.includes('Complaint regarding defective product'));
  assert.ok(res.text.includes('ABC Mobiles'));
});

test('buildLetter: missing required fields reported, empty input never throws', () => {
  const res = app.buildLetter('police-letter', {}, 'hi');
  assert.strictEqual(res.ok, false);
  assert.ok(res.missing.length >= 4);
  assert.deepStrictEqual(app.buildLetter('police-letter', null, 'hi').ok, false);
  assert.deepStrictEqual(app.buildLetter('no-such-template', {}, 'hi'), { ok: false, missing: [], error: 'unknown-template' });
  // optional date defaults to today instead of failing
  const ok = app.buildLetter('grievance-letter', {
    name: 'Meena', address: 'Nashik', department: 'जल विभाग', details: 'पानी नहीं आ रहा।'
  }, 'hi');
  assert.strictEqual(ok.ok, true);
  assert.match(ok.text, /दिनांक: \d{4}-\d{2}-\d{2}/);
});

test('checklist: toggle adds/removes, progress counts, serialise round-trips, bad input is safe', () => {
  let s = {};
  s = app.toggleChecklist(s, 'rti', 0);
  s = app.toggleChecklist(s, 'rti', 2);
  assert.strictEqual(app.checklistProgress(s, 'rti').done, 2);
  assert.strictEqual(app.checklistProgress(s, 'rti').total, 5);
  assert.strictEqual(app.checklistProgress(s, 'rti').pct, 40);
  s = app.toggleChecklist(s, 'rti', 0);
  assert.strictEqual(app.checklistProgress(s, 'rti').done, 1);
  // toggling does not mutate the input object
  const before = { 'rti:1': true };
  const after = app.toggleChecklist(before, 'rti', 1);
  assert.deepStrictEqual(before, { 'rti:1': true });
  assert.deepStrictEqual(after, {});
  // serialise / parse
  assert.deepStrictEqual(app.parseChecklist(app.serializeChecklist(s)), s);
  assert.deepStrictEqual(app.parseChecklist('not json{{'), {});
  assert.deepStrictEqual(app.parseChecklist('[]'), {});
  assert.deepStrictEqual(app.checklistProgress({}, 'nope'), { done: 0, total: 0, pct: 0 });
});

test('help board: validation rejects empty posts; addPost appends without mutating', () => {
  assert.deepStrictEqual(app.validatePost({}), ['title', 'description', 'type']);
  assert.deepStrictEqual(app.validatePost({ title: 'x', description: 'y', type: 'offer', category: 'bad' }), ['category']);
  assert.deepStrictEqual(app.validatePost({ title: 'Help', description: 'Need RTI help', type: 'request' }), []);
  const posts = [];
  const res = app.addPost(posts, { title: ' RTI help ', description: 'Need help filing', type: 'request', category: 'rti', location: 'Shirur', name: '' });
  assert.strictEqual(res.ok, true);
  assert.strictEqual(posts.length, 0, 'input array not mutated');
  assert.strictEqual(res.posts.length, 1);
  assert.strictEqual(res.posts[0].title, 'RTI help');
  assert.strictEqual(res.posts[0].name, 'Anonymous');
  assert.strictEqual(res.posts[0].resolved, false);
  const bad = app.addPost(posts, { title: '', description: '', type: 'request' });
  assert.strictEqual(bad.ok, false);
  assert.deepStrictEqual(bad.posts, posts);
});

test('help board: filter by type/category/query, hideResolved, toggleResolved', () => {
  const seed = [
    { id: '1', type: 'request', category: 'rti', title: 'RTI help', description: 'filing help', location: 'Shirur', name: 'A', createdAt: '2026-11-24', resolved: false },
    { id: '2', type: 'offer', category: 'cyber', title: 'Cyber fraud guidance', description: 'I can guide 1930 reporting', location: '', name: 'B', createdAt: '2026-11-24', resolved: true },
    { id: '3', type: 'offer', category: 'rti', title: 'RTI drafting', description: 'I draft letters', location: 'Pune', name: 'C', createdAt: '2026-11-24', resolved: false }
  ];
  assert.strictEqual(app.filterPosts(seed, {}).length, 3);
  assert.strictEqual(app.filterPosts(seed, { type: 'offer' }).length, 2);
  assert.strictEqual(app.filterPosts(seed, { category: 'rti' }).length, 2);
  assert.strictEqual(app.filterPosts(seed, { query: 'pune' }).length, 1);
  assert.strictEqual(app.filterPosts(seed, { query: 'rti help' }).length, 1);
  assert.strictEqual(app.filterPosts(seed, { query: 'drafting' }).length, 1);
  assert.strictEqual(app.filterPosts(seed, { hideResolved: true }).length, 2);
  assert.strictEqual(app.filterPosts(seed, { query: 'zzz' }).length, 0);
  assert.strictEqual(app.filterPosts(null, {}).length, 0);
  const toggled = app.toggleResolved(seed, '1');
  assert.strictEqual(toggled[0].resolved, true);
  assert.strictEqual(seed[0].resolved, false, 'input not mutated');
  assert.deepStrictEqual(app.parsePosts(app.serializePosts(seed)), seed);
  assert.deepStrictEqual(app.parsePosts('garbage'), []);
});
