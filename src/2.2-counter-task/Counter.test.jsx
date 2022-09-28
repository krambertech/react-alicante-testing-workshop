/**
 *  👉 TASK: Cover Counter component with tests
 *
 * Run tests with:
 * > npm test Counter
 * */

// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

// import Counter from "./Counter";

/**
 * Write a test that Counters renders with initial value 0 and displays increment
 * and decrement buttons
 *
 * 💡 Tips:
 *  - To access buttons use `getByRole("button", { name: /label/i })`
 * - To access counter's value you can use `getByText(/count: X/i)` query
 */
test.todo("renders with initial value 0 and increment and decrement buttons");

/**
 * Write a test that Counter allows to increment and decrement value
 *
 * 💡 Tips:
 * - To click on a button use `userEvent.click(button)`
 */
test.todo("allows increment and decrement");

/**
 * 🚀 BONUS (TDD)
 * Allows to set initial value via props
 *
 * Example:
 * <Counter initialValue={3} />
 */
// test.todo("allows to set initial value");

/**
 * 🚀 BONUS (TDD)
 * Does not allow to go below min and above max
 *
 * Make it so Counter component can accept min and max props and does
 * not allow user to go below min and above max by making buttons disabled
 *
 * Example:
 * <Counter min={5} max={12} />
 *
 * 💡 Tips:
 * - To check if button is disabled use `toBeDisabled()` matcher
 */
// test.todo("does not allow to go below min and above max");

/**
 * 🚀 BONUS
 * Write a helper runTimes function that
 * You might have noticed that we often need to write the same code to run a increment/decrement multiple times. Let's create a utility function that will help us make our tests more consice. Create `runTimes` function that accepts a function and a number, then runs the function that many times.
 *
 * Example:
 * runTimes(5, () => userEvent.click(incrementButton))
 *
 * Then, use it in your tests to make them more consice
 */

// function runTimes() {}
