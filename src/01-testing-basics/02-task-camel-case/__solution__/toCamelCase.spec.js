// 👉 TASK: Cover `toCamelCase` with a set of tests
//
// Here you would need to think about the suites yourself.
// Given the function itself, what are the important cases to cover?
//
// Run tests with:
//   npm test toCamelCase

import toCamelCase from "../toCamelCase";

test("transforms words separated by dash (-) to camelCase", () => {
  expect(toCamelCase('hello-world')).toBe('helloWorld');
  expect(toCamelCase('hello-worLd-Hello')).toBe('helloWorldHello');
  expect(toCamelCase('hello-wORLD---hello')).toBe('helloWorldHello');
});

test("transforms words separated by underscore (_) to camelCase", () => {
  expect(toCamelCase('hello_woRLd')).toBe('helloWorld');
  expect(toCamelCase('hello_world_hello_hello')).toBe('helloWorldHelloHello');
  expect(toCamelCase('hello_world____hello')).toBe('helloWorldHello');
});

test("transforms words separated by space ( ) to camelCase", () => {
  expect(toCamelCase('hello WoRLd')).toBe('helloWorld');
  expect(toCamelCase('hello WORLD   heLLO')).toBe('helloWorldHello');
  expect(toCamelCase('hello world hello  HELLO')).toBe('helloWorldHelloHello');
});

test("transforms words with a mix of separators to camelCase", () => {
  expect(toCamelCase('hello_-WoRLd')).toBe('helloWorld');
  expect(toCamelCase('hello WORLD_heLLO')).toBe('helloWorldHello');
  expect(toCamelCase('hello_world hello---  HELLO')).toBe('helloWorldHelloHello');
});

// Good luck 🍀