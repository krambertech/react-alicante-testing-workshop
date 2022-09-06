// Exercise 1: Write tests for `multiply` function
// make sure to cover different cases in your tests
//
// Run your tests with: 
//   npm test 01.multiply


import multiply from "./01.multiply"

test("mulptiples positive numbers", () => {
    // Check that it can correctly multiply positive numbers
    // 💡 Tip: make sure you cover different cases within this test
    expect(multiply(2, 3)).toBe(6);

})

test("mulptiples negative numbers", () => {
    // Check that it can correctly multiply positive numbers
    // 💡 Tip: make sure you cover different combinations of positive and negative numbers

})

test("handles invalid input", () => {
    // Here we need to test how `multiply` handles invalid input, e.g. strings
    // 💡 Tip: make sure you cover different combinations of positive and negative numbers

})