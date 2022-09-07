// 👉 TASK: Write tests for `multiply` function
// make sure to cover different cases in your tests
//
// When working on tests you might find it useful to try 
// and break your code and see how tests react
//
// Run your tests with:
//   npm test multiply

import multiply from "../multiply";

test("mulptiples positive numbers", () => {
  // Check that it can correctly multiply positive numbers
  // 💡 Tip: make sure you cover different cases within this test

  expect(multiply(2, 3)).toBe(6);
  expect(multiply(2, 1)).toBe(2);
  expect(multiply(12, 0)).toBe(0);
  expect(multiply(Infinity, 2)).toBe(Infinity);
  expect(multiply(NaN, 3)).toBe(NaN);
});

test("mulptiples negative numbers", () => {
  // Check that it can correctly multiply positive numbers
  // 💡 Tip: make sure you cover different combinations of positive and negative numbers

  expect(multiply(-2, -4)).toBe(8);
  expect(multiply(2, -1)).toBe(-2);
  expect(multiply(-12, 3)).toBe(-36);
  expect(multiply(Infinity, -2)).toBe(-Infinity);
  expect(multiply(NaN, -3)).toBe(NaN);
});

test("handles invalid input", () => {
  // Here we need to test how `multiply` handles invalid input, e.g. strings, objects etc

  expect(() => multiply('hello', 3)).toThrowError();
  expect(() => multiply(undefined, null)).toThrowError();
  expect(() => multiply(null, 3)).toThrowError();
  expect(() => multiply({}, 2)).toThrowError();
});

// 💡 TIP:
// Sometimes it is useful to test that the operation throws an error, see more:
// https://jestjs.io/docs/expect#tothrowerror
//
// Good luck 🍀