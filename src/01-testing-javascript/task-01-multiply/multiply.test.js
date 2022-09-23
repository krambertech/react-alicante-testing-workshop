// 👉 TASK: Write tests for `multiply` function
// make sure to cover different cases in your tests
//
// When working on tests you might find it useful to try
// and break your code and see how tests react
//
// Run your tests with:
//   npm test multiply

import multiply from "./multiply";

// Check that it can correctly multiply positive numbers
// 💡 Tip: make sure you cover different cases within this test
test("Multiplies positive numbers", () => {
    expect(multiply(1, 2)).toBe(2);
    expect(multiply(2, 10)).toBe(20);
    expect(multiply(0, 3)).toBe(0);
    expect(multiply(2.5, 2.5)).toBe(6.25);
    expect(multiply(NaN, 2)).toBe(NaN);
    expect(multiply(Infinity, 2)).toBe(Infinity);
    expect(multiply(Infinity, Infinity)).toBe(Infinity);
    expect(multiply(Infinity, NaN)).toBe(NaN);
    expect(multiply(Number.MAX_VALUE, 5)).toBe(Infinity);
    expect(multiply(Number.MIN_VALUE, 5)).toBe(2.5e-323);
    expect(multiply(Number.MIN_VALUE, Number.MAX_VALUE)).toBe(8.881784197001251e-16);
});

// Check that it can correctly multiply negative numbers
// 💡 Tip: make sure you cover different combinations of positive and negative numbers

test("Multiplies negative numbers", () => {
    expect(multiply(1, -2)).toBe(-2);
    expect(multiply(-2, -10)).toBe(20);
    expect(multiply(-0, 3)).toBe(-0);
    expect(multiply(-2.5, 2.5)).toBe(-6.25);
    expect(multiply(NaN, -2)).toBe(NaN);
    expect(multiply(-Infinity, 2)).toBe(-Infinity);
    expect(multiply(Infinity, -2)).toBe(-Infinity);
    expect(multiply(-Infinity, Infinity)).toBe(-Infinity);
    expect(multiply(Number.MAX_VALUE, -5)).toBe(-Infinity);
    expect(multiply(-Number.MIN_VALUE, 5)).toBe(-2.5e-323);
    expect(multiply(Number.MIN_VALUE, -Number.MAX_VALUE)).toBe(-8.881784197001251e-16);


});

// Here we need to test how `multiply` handles invalid input, e.g. strings
// 💡 Tip: to test that operation throws an error use https://jestjs.io/docs/expect#tothrowerror
test("throws error when multiply input is invalid", () => {
    expect(() => multiply("a", "b")).toThrow(Error);
    console.log()
    // expect(() => multiply(2, 3, 2)).toThrow(Error);
    expect(() => multiply(null, 2)).toThrow(Error);
    expect(() => multiply(true, 2)).toThrow(Error)
    expect(() => multiply(undefined, 2)).toThrow(Error)
    expect(() => multiply(() => { }, 2)).toThrow(Error)
    expect(() => multiply({}, 2)).toThrow(Error)
    expect(() => multiply('a', 2)).toThrow(Error)
    expect(() => multiply(3, undefined)).toThrow(Error)

});


// Good luck 🍀
