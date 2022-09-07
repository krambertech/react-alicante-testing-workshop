// This is our own implementation of testing framework
// const { test, expect } = require("./testing-framework.js");
//
// Run Jest tests
//   npm test sum

const sum = require("./sum");

test("sums 2 numbers", () => {
  expect(sum(2, 3)).toBe(5);
  expect(sum(4, 9)).toBe(13);
});

test("sums 3+ numbers", () => {
  expect(sum(2, 3, 4)).toBe(9);
  expect(sum(2, 8, 11)).toBe(21);
  expect(sum(1, 2, 3, 4, 5)).toBe(15);
});

test("sums negative numbers", () => {
  expect(sum(2, -3, 4)).toBe(3);
  expect(sum(-1, -3, -5)).toBe(-9);
});
