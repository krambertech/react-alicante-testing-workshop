// 👉 TASK: Implement `passwordValidator` function in TDD style.
//
// The function should accept a password as a string and return `undefined` if the password is valid.
// The function should return an error message if the password is invalid.
//
// The password should be:
// - at least 8 characters long
// - contain at least one number
// - contain at least one letter
// - contain at least one special character
//
// 🎁 BONUS: Have fun with it! You can add your own rules :)

import passwordValidator from "./passwordValidator";

test("returns undefined if password is valid", () => {
  expect(passwordValidator("securePas$word1")).toBeUndefined();
  expect(passwordValidator("jhqgdgYJYG3627^&%")).toBeUndefined();
});

test("returns error message if password too short", () => {
  expect(passwordValidator("")).toBe(
    "Password must be at least 8 characters long"
  );
  expect(passwordValidator("c12!")).toBe(
    "Password must be at least 8 characters long"
  );
  expect(passwordValidator("c12H62!")).toBe(
    "Password must be at least 8 characters long"
  );
});

test("returns error message if password does not contain numbers", () => {
  expect(passwordValidator("helloWorld")).toBe(
    "Password must contain at least one number"
  );
  expect(passwordValidator("blaBLA!!!")).toBe(
    "Password must contain at least one number"
  );
});

test("returns error message if password does not contain letters", () => {
  expect(passwordValidator("1234567868")).toBe(
    "Password must contain at least one letter"
  );
  expect(passwordValidator("67687900!!!")).toBe(
    "Password must contain at least one letter"
  );
});

test("returns error message if password does not contain special characters", () => {
  expect(passwordValidator("Hell0W0rld")).toBe(
    "Password must contain at least one special character"
  );
  expect(passwordValidator("V3ryC00l")).toBe(
    "Password must contain at least one special character"
  );
});

// Good luck! 🍀
