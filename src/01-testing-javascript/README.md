# Module 1 - Testing JavaScript

Here we explore how testing works, build a small testing framework and learn to use Jest to test JavaScript.

**Let's go! 🚀**

## 🐇 Jump around <!-- omit in toc -->

- [✨ Summary](#-summary)
- [📝 Notes](#-notes)
  - [Part 1: What is testing](#part-1-what-is-testing)
  - [Part 2: Introducing TDD](#part-2-introducing-tdd)
- [👩‍💻 Tasks](#-tasks)
  - [Task 1.1: Cover `multiply` function with tests](#task-11-cover-multiply-function-with-tests)
  - [Task 1.2: TDD](#task-12-tdd)
  - [Task 1.3 (🎁 BONUS): Cover `toCamelCase` function with tests](#task-13--bonus-cover-tocamelcase-function-with-tests)
- [💡 Quiz](#-quiz)
- [📚 Materials](#-materials)
- [👉 Next](#-next)

## ✨ Summary

- What is testing
- Assertions and testing library
- Setting up Jest
- Using Jest to test JavaScript code

## 📝 Notes

### Part 1: What is testing

Imagine building a house, you create blueprint and build it. After it is done, you rarely make changes to the core construction. Software os different, it is dymanic -- we make changes to it over time. Different types of software testing can help us to ensure that the result meets requirements and continues meeting them as we make changes to it.

To start with, have this implementation of `sum` function that sums all numbers passed to it.

```js
const sum = (...numbers) =>
  numbers.reduce((result, number) => result + number, 0);
```

We want to make sure that it will run correctly in case we will be making changes. We can write a simple check that will throw an error if result is incorrect.

```js
const result = sum(2, 3);
const expected = 5;

if (result !== expected) {
  throw new Error(`⛔️ ${result} is not equal to ${expected}`);
}
```

But summing 2 numbers is not the only thing `sum` does. It can sum 3 numbers, or take different values. Let's also test that it sums 3 numbers:

```js
const result = sum(2, 3, 4);
const expected = 9;

if (result !== expected) {
  throw new Error(`⛔️ ${result} is not equal to ${expected}`);
}
```

Now as we want to add more and more cases that we want to cover with our testing, we see that we repeat the same code over and over again. We can ebstract our comparison logic away into `expect` function:

```js
const expect = (result) => ({
  toBe(expected) {
    if (result !== expected) {
      throw new Error(`WRONG! ${result} is not equal to ${expected}`);
    }
  },
});
```

_✨ This is called assertion_

With this it will be easier to write our tests:

```js
expect(sum(2, 3)).toBe(5);
expect(sum(2, 3, 4)).toBe(9);
expect(sum(2, -3, 4)).toBe(3);
```

But now we see the problem that if the test in the middle fails, we would not know the results of the tests above. Let's fix it by implementing our own `test` function that will produce test output.

```js
const test = (name, cb) => {
  try {
    cb();
    console.log("✅", name);
  } catch (err) {
    console.log("⛔️", err.message);
  }
};
```

Then we can write our test cases like this:

```js
test("sums 2 numbers", () => {
  expect(sum(2, 3)).toBe(5);
});

test("sums 3 numbers", () => {
  expect(sum(2, 3, 4)).toBe(9);
});

test("sums negative numbers", () => {
  expect(sum(2, -3, 4)).toBe(3);
});
```

Running this file will produce this output:

<details>
  <summary>Output</summary>

  ```
  ✅ sums 2 numbers
  ✅ sums 3 numbers
  ✅ sums negative numbers
  ```
</details>

Awesome, right? We just write our own very minimal test framework ✨

Interestngly `jest` works in a similar fashion. Jest already comes pre-installed with CRA, so we can just run our test:

```
npm test sum.test.js
```

Which will produce this beautiful report in the console:

<details>
  <summary>Output</summary>

  ```
  PASS  src/00-vanilla-test/sum.test.js
    ✓ sums 2 numbers (1 ms)
    ✓ sums 3 numbers
    ✓ sums negative numbers

  Test Suites: 1 passed, 1 total
  Tests: 3 passed, 3 total
  Snapshots: 0 total
  Time: 0.56 s, estimated 1 s
  ```
</details>

Just comes with its own assertion library ([Jest Matchers](https://jestjs.io/docs/expect)) and a bunch of other features which we explore as we go further.

**👉 👉 👉 Task 1.1**

### Part 2: Introducing TDD

So far we wrote all tests for the code that is already written to create a safetynet for us when we make changes. But what if we write tests first?

This approach is called TDD - Test Driven Development, it's when tests drive your development.

Let's take a simple case, we want to write `pluralize` function that will return return strings with plural or single form based on the number.

Let's create a boilerplate for a future function:

```js
function pluralize() {
  return "";
}
````

Now, let's write some tests to cover main cases:

```js
test("returns sigular form for count 1", () => {
  expect(pluralize(1, "cat", "cats")).toBe("1 cat");
  expect(pluralize(1, "dog", "dogs")).toBe("1 dog");
});

test("returns plural form for count > 1 & 0", () => {
  expect(pluralize(2, "cat", "cats")).toBe("2 cats");
  expect(pluralize(5, "dog", "dogs")).toBe("5 dogs");
  expect(pluralize(8, "sheep", "sheep")).toBe("8 sheep");
});
```

If we run our tests `npm test pluralize` we see that they are red 🛑. Let's go ahead and implement our function to make the tests green:

```js
function pluralize(count, singularWord, pluralWord) {
  if (count === 1) {
    return `${count} ${singularWord}`;
  }
  return `${count} ${pluralWord}`;
}
```

Now tests are green 🟢, but we see that in most of the cases plural form could be generalted based on singular form by adding `s`. Would be cool for our function to handle it.

Let's write a test for it:

```js
test("generates plural form based on singular", () => {
  expect(pluralize(2, "cat")).toBe("2 cats");
  expect(pluralize(5, "dog")).toBe("5 dogs");
  expect(pluralize(0, "chair")).toBe("0 chairs");
});
```

Tests red again 🛑, let's go ahead and modify our function:

```js
function pluralize(count, singularWord, pluralWord = = `${singularWord}s`) { ... }
```

That did the trick, tests are green again 🟢, yay! But what if invalid imput will be passed to our function. Let's test it!

```js
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
```

Red tests again 🛑, let's handle this case and throw and error in our code:

```js
if (typeof count !== "number") {
  throw new Error("Invalid input: count needs to be a number");
}
```

Awesome, all green! This how your workflow with TDD could look like ✨

**👉 👉 👉 Task 1.2**

## 👩‍💻 Tasks

As we just covered the basics of testing, you have a task of writing your own set of tests and several modules.

### Task 1.1: Cover `multiply` function with tests

You need to cover with tests function that multiples 2 numbers. Head to `/task-01-multiply` and open `multiply.test.js`. I have prepared test cases for you, you just need to fill them with checks.

### Task 1.2: TDD

// TODO: add

### Task 1.3 (🎁 BONUS): Cover `toCamelCase` function with tests

ℹ️ *Bonus tasks can be completed if you finished early with main tasks or at home*

You need to cover with tests function that transforms strings to camelCase. It uses regular expressions, which can be hard to wrap your mind around, that's why wring tests for it is important.

`/task-03-camel-case` and open `camelCase.test.js`

## 💡 Quiz

// TODO: add quiz

## 📚 Materials

- [Jest's documentation](https://jestjs.io/docs/getting-started)
- [Jest's `expect` docs](https://jestjs.io/docs/expect)

## [👉 Next](https://github.com/krambertech/react-testing-workshop/tree/main/src/02-testing-react)
