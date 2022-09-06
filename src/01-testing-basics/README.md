# Step 1 - Testing JavaScript

Imagine building a house, you create blueprint and build it. After it is done, you rarely make changes to the core construction. Software os different, it is dymanic -- we make changes to it over time. Different types of software testing can help us to ensure that the result meets requirements and continues meeting them as we make changes to it.

Here we explore how testing works, build a small testing framework and learn to use Jest to test JavaScript.


## 🐇 Jump around

[Summary](#-summary) | [Notes](#-notes) | [Exercises](#-exercises) | [Quiz](#-quiz) | [Resources](#-materials) | [Next](#-next)


## ✨ Summary

- What is testing
- Assertions and testing library
- Setting up Jest
- Using Jest to test JavaScript code


## 📝 Notes

Here we will understand how testing in general works and implement our own version of testing framework (very simplified, of course)

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

*✨ This is called assertion*

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

```
✅ sums 2 numbers
✅ sums 3 numbers
✅ sums negative numbers
```

Awesome, right? We just write our own very minimal test framework ✨ 

Interestngly `jest` works in a similar fashion. Jest already comes pre-installed with CRA, so we can just run our test:

```
npm test sum.test.js
```

Which will produce this beautiful report in the console:

```
 PASS  src/00-vanilla-test/sum.test.js
  ✓ sums 2 numbers (1 ms)
  ✓ sums 3 numbers
  ✓ sums negative numbers

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.56 s, estimated 1 s
```

Just comes with its own assertion library ([Jest Matchers](https://jestjs.io/docs/expect)) and a bunch of other features which we explore as we go further.

## 👩‍💻 Exercises

As we just covered the basics of testing, you have a task of writing your own set of tests and several modules.

### Exercise 1.1

// TODO

### Exercise 1.2

// TODO

## 💡 Quiz

// TODO: Add quiz

## 📚 Materials

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Jest's `expect`](https://jestjs.io/docs/expect)

## 👉 Next

// TODO: add "next"