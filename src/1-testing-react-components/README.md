# Module 1 - Testing React components

Here we talk about how to test React components and mock async API calls.

## 🐇 Jump around <!-- omit in toc -->

- [✨ Summary](#-summary)
- [👩‍💻 Tasks](#-tasks)
  - [Task 1: Test Counter component](#task-1-test-counter-component)
    - [🚀 Bonus task: Does not allow to go below min and above max](#-bonus-task-does-not-allow-to-go-below-min-and-above-max)
    - [🚀 Bonus task: (TDD) Displays alert if count becomes out of boundaries](#-bonus-task-tdd-displays-alert-if-count-becomes-out-of-boundaries)
    - [🚀 Bonus task: Create `runTimes` test utility function](#-bonus-task-create-runtimes-test-utility-function)
  - [Task 2: Test async quote generation](#task-2-test-async-quote-generation)
    - [🚀 Bonus task: (TDD) Displays error if API call fails](#-bonus-task-tdd-displays-error-if-api-call-fails)
    - [🚀 Bonus task: Create a `mockQuote` function](#-bonus-task-create-a-mockquote-function)
- [📚 Materials](#-materials)

## ✨ Summary

- introduction to `dom-testing-library` `react-testing-library`
- `userEvent` for user interactions
- testing React components
- API mocking

## 👩‍💻 Tasks

To run the application locally  `npm start` and open [http://localhost:3000/](http://localhost:3000/) in the browser.

### Task 1: Test Counter component

Now it's time for you to practice testing React components on your own. I prepared Counter component that you would need to cover with a set of tests. Open `/2-task-counter/Counter.test.jsx` and implement this test scenario: renders with initial value 0 and allows increment and decrement.

Run this component tests with `npm test Counter`

**Implement these 2 scenarios:**
- `renders with initial value 0 and increment and decrement buttons`
- `allows to increment and decrement`

**💡 Hints:**
- To access buttons use `getByRole("button", { name: /label/i })` 
- For click use `userEvent.click()` helper function
- To access counter's value use `getByText(/count: X/i)` query

#### 🚀 Bonus task: Does not allow to go below min and above max

Now, let's add a bit more complexity to our tests. Counter accepts props `min` and `max`. If we try to increment above max or decrement below min, we want to prevent this from happening by disabling the respective buttons. Add a test case `does not allow to go below min and above max`

Additionally, in this test you can test that `Counter` sets `min` as initial value. 

**💡 Hints:**
- To check that button is disabled use `toBeDisabled()` matcher (and `toBeEnabled()` respectively)

#### 🚀 Bonus task: (TDD) Displays alert if count becomes out of boundaries

`Counter` is a component that can be rerendered with different props. This also means that the props can be changed from the parent component, which can create different problems. Currently it is the case not handled by Counter component. Let's fix it!

I suggest you use TDD technique to implement this feature. First, write a test that checks that `Counter` displays an alert if count is out of boundaries (in order to achieve this state you would need to rerender Counter with new `min` and `max` props). The test should be red first. Then, implement the feature in `Counter` component until your test is green.

**💡 Hints:**
- To rerender component use `rerender()` function from `render()` result
- Use `role="alert"` to display the alert

#### 🚀 Bonus task: Create `runTimes` test utility function

You might have noticed that we often need to write the same code to run a increment/decrement multiple times. Let's create a utility function that will help us make our tests more consice. Create `runTimes` function that accepts a function and a number, then runs the function that many times.

```js
runTimes(5, () => userEvent.click(incrementButton));
```

### Task 2: Test async quote generation

Now as we talked about mocking, implement a sumple async component test yourself. Head to `/4-task-quotes/Quote.test.jsx`, there you will find small component that generates random quotes using REST API. 

Run tests for this component with `npm test Quote`

You need to implement these test cases: 
- `displays a random quote from API` (make sure to check that loading indication is shown while loading)
- `allows to select category and displays a quote from API`

**💡 Hints:**
- You can mock the whole `api` module with `jest.mock("./api");`, alternatively you can mock `fetch` 
- To work with a select element use `getByRole("combobox")` and `userEvent.selectOptions()`
- Important to note, that `testing-library` follows ARIA standards and the way they define [implicit roles](https://www.w3.org/TR/html-aria/#docconformance). Therefore you would see that there is no "blockquote" role. To get quote contents you can use `getByText` query
- To wait until loading finishes you have a few strategies, read more about them [here](https://testing-library.com/docs/dom-testing-library/api-async#waitfor)

#### 🚀 Bonus task: (TDD) Displays error if API call fails

Currently `QuoteGenerator` component does not display an error state. Add a test case `displays error if API call fails` that checks that error is displayed when API call fails. Then, implement the feature in `QuoteGenerator` component until your test is green.

**💡 Hints:**
- Use `.mockRejectedValueOnce` to mock API call failure (rejected promise)

#### 🚀 Bonus task: Create a `mockQuote` function

When we are mocking API we often do not need the whole structure of the response, but only a part of it. Let's create a generator for the quote that will return a generated quote object and still accept the overrides. 

Create this function and use it in your tests:

```js
mockQuote({ content: "test" });
```

## 📚 Materials

- [DOM testing library](https://testing-library.com/docs/dom-testing-library/example-intro)
- [Queries in testing library](https://testing-library.com/docs/queries/about/)
- [Write fewer, longer tests](https://kentcdodds.com/blog/write-fewer-longer-tests)
- [Jest's Mock API](https://jestjs.io/docs/mock-function-api)
- [Async methods in `testing-library`](https://testing-library.com/docs/dom-testing-library/api-async)
