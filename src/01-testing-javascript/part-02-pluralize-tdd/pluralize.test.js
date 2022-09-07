import pluralize from "./pluralize";

test("returns sigular form for count 1", () => {
  expect(pluralize(1, "cat", "cats")).toBe("1 cat");
  expect(pluralize(1, "dog", "dogs")).toBe("1 dog");
});

test("returns plural form for count > 1 & 0", () => {
  expect(pluralize(2, "cat", "cats")).toBe("2 cats");
  expect(pluralize(5, "dog", "dogs")).toBe("5 dogs");
  expect(pluralize(8, "sheep", "sheep")).toBe("8 sheep");
});

test("generates plural form based on singular", () => {
  expect(pluralize(2, "cat")).toBe("2 cats");
  expect(pluralize(5, "dog")).toBe("5 dogs");
  expect(pluralize(0, "chair")).toBe("0 chairs");
});

test("throws error if count is not a number", () => {
  expect(() => {
    pluralize("2", "cat", "cats");
  }).toThrow("Invalid input: count needs to be a number");
  expect(() => {
    pluralize(null, "cat", "cats");
  }).toThrow("Invalid input: count needs to be a number");
  expect(() => {
    pluralize({}, "cat", "cats");
  }).toThrow("Invalid input: count needs to be a number");
});

test("throws error if count is negative number", () => {
  expect(() => pluralize(-1, "cat", "cats")).toThrowError(
    "Invalid input: count needs to be a positive number"
  );
});
