const { test } = require('node:test');
const assert = require('node:assert/strict');
require('../codec.js');
const codec = globalThis.Base64Codec;
test('known vectors and Unicode round trips', () => {
  assert.equal(codec.encode('hello'), 'aGVsbG8=');
  for (const value of ['', 'f', 'fo', 'foo', 'Hello, 世界! 👋', '\uFEFFhello', 'a\u0000b', 'é']) {
    for (const urlSafe of [false, true]) assert.equal(codec.decode(codec.encode(value, urlSafe), urlSafe), value);
  }
});
test('whitespace and unpadded input', () => {
  assert.equal(codec.decode(' aGVs\nbG8= '), 'hello');
  assert.equal(codec.decode('aGVsbG8'), 'hello');
});
test('reject invalid encoding and non-text bytes', () => {
  for (const value of ['a', '!!!!', 'Zg=', 'Z===', 'Zh==', '/w==']) assert.throws(() => codec.decode(value));
});
test('URL-safe alphabet requires the matching mode', () => {
  const value = codec.encode('👋', true);
  assert.equal(codec.decode(value, true), '👋');
  assert.throws(() => codec.decode(value));
});
