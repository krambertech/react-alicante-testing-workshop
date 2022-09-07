// 👉 TASK: Write tests for `multiply` function
// make sure to cover different cases in your tests
//
// When working on tests you might find it useful to try 
// and break your code and see how tests react
//
// Run your tests with:
//   npm test multiply

import multiply from "./multiply";

test("mulptiples positive numbers", () => {
  // Check that it can correctly multiply positive numbers
  // 💡 Tip: make sure you cover different cases within this test

  expect(multiply(2, 3)).toBe(6);

  // 👉 Implement me!
});

test("mulptiples negative numbers", () => {
  // Check that it can correctly multiply positive numbers
  // 💡 Tip: make sure you cover different combinations of positive and negative numbers

  // 👉 Implement me!
});

test("throws error when input is invalid", () => {
  // Here we need to test how `multiply` handles invalid input, e.g. strings
  // 💡 Tip: make sure you cover different combinations of positive and negative numbers

  // 👉 Implement me!
});

// 💡 TIP:
// How to test that operation throws an error:
// https://jestjs.io/docs/expect#tothrowerror
//
// Good luck 🍀
