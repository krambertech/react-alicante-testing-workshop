// 👉 TASK: Write tests for `multiply` function
// make sure to cover different cases in your tests
//
// When working on tests you might find it useful to try
// and break your code and see how tests react
//
// Run your tests with:
//   npm test multiply

import multiply from "../multiply";

test("mulptiplies positive numbers", () => {
  expect(multiply(2, 3)).toBe(6);
  expect(multiply(2, 1)).toBe(2);
  expect(multiply(12, 0)).toBe(0);
  expect(multiply(Infinity, 2)).toBe(Infinity);
  expect(multiply(NaN, 3)).toBe(NaN);
});

test("mulptiplies negative numbers", () => {
  expect(multiply(-2, -4)).toBe(8);
  expect(multiply(2, -1)).toBe(-2);
  expect(multiply(-12, 3)).toBe(-36);
  expect(multiply(Infinity, -2)).toBe(-Infinity);
  expect(multiply(NaN, -3)).toBe(NaN);
});

test("handles invalid input", () => {
  expect(() => multiply("hello", 3)).toThrowError();
  expect(() => multiply(undefined, null)).toThrowError();
  expect(() => multiply(null, 3)).toThrowError();
  expect(() => multiply({}, 2)).toThrowError();
});
