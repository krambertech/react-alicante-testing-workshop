import calculator from "../calculator";

test("adds numbers", () => {
  expect(calculator("add", 1, 2)).toBe(3);
  expect(calculator("add", 1, -2)).toBe(-1);
  expect(calculator("add", -10, -2)).toBe(-12);
});

test("subtracts numbers", () => {
  expect(calculator("subtract", 1, 2)).toBe(-1);
  expect(calculator("subtract", 1, -2)).toBe(3);
  expect(calculator("subtract", -10, -2)).toBe(-8);
});

// 3. 🚀 BONUS Check that it throws an error if operation is not supported
test("throws error when operation is unsupported", () => {
  expect(() => calculator("pow", 1, 2)).toThrow("Invalid operation code");
  expect(() => calculator("", 1, 2)).toThrow("Invalid operation code");
});

// 4. 🚀 BONUS (TDD) Using TDD approach write a test for "multiply" operation
test("multiplies numbers", () => {
  expect(calculator("multiply", 1, 2)).toBe(2);
  expect(calculator("multiply", 1, -2)).toBe(-2);
  expect(calculator("multiply", -10, -2)).toBe(20);
});

// 5. 🚀 BONUS (TDD) Make sure that calculator function throws an error
test("throws error when input is not a number", () => {
  expect(() => calculator("add", 1, "2")).toThrow(
    "Invalid input, expected 2 numbers"
  );
  expect(() => calculator("subtract", 1, [2])).toThrow(
    "Invalid input, expected 2 numbers"
  );
  expect(() => calculator("multiply", 1, {})).toThrow(
    "Invalid input, expected 2 numbers"
  );
});
