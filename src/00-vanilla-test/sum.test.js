// This is our own implementation of testing framework
// const { test, expect } = require("./testing-framework.js");
const sum = require("./sum");

test("sums 2 numbers", () => {
  expect(sum(2, 3)).toBe(5);
});

test("sums 3 numbers", () => {
  expect(sum(2, 3, 4)).toBe(9);
});

test("sums negative numbers", () => {
  expect(sum(2, -3, 4)).toBe(3);
});
