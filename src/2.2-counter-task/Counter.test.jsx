/**
 *  👉 TASK: Cover Counter component with tests
 *
 * Run tests with:
 * > npm test Counter
 * */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Counter from "./Counter";

/**
 * Write a test that Counters renders with initial value 0 and displays increment
 * and decrement buttons
 *
 * 💡 Tips:
 *  - To access buttons use `getByRole("button", { name: /label/i })`
 * - To access counter's value you can use `getByText(/count: X/i)` query
 */
test("renders with initial value 0 and increment and decrement buttons", () => {
    render(<Counter />);

    expect(screen.getByRole('button', { name: /decrement/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /increment/i })).toBeInTheDocument();
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
})

/**
 * Write a test that Counter allows to increment and decrement value
 *
 * 💡 Tips:
 * - To click on a button use `userEvent.click(button)`
 */
test("allows increment and decrement", () => {
    render(<Counter />);

    //Check if counter is at 0.
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

    const dec = screen.getByRole('button', { name: /decrement/i });
    const inc = screen.getByRole('button', { name: /increment/i });

    userEvent.click(dec);
    expect(screen.getByText(/count: -1/i)).toBeInTheDocument();

    userEvent.click(inc);
    userEvent.click(inc);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
})

/**
 * 🚀 BONUS (TDD)
 * Allows to set initial value via props
 *
 * Example:
 * <Counter initialValue={3} />
 */
test("allows to set initial value", () => {
    render(<Counter initialValue={3} />);
    expect(screen.getByText(/count: 3/i)).toBeInTheDocument();
})

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
test("does not allow to go below min and above max", () => {
    render(<Counter min={0} max={5} />);

    const dec = screen.getByRole('button', { name: /decrement/i });
    const inc = screen.getByRole('button', { name: /increment/i });

    //Check if disabled.
    expect(dec).toBeDisabled();

    //Try to decrement.
    runTimes(5, () => userEvent.click(dec))

    //Should still be 0.
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

    //Click 10 times.
    runTimes(5, () => userEvent.click(inc))
    //Should be 5.
    expect(screen.getByText(/count: 5/i)).toBeInTheDocument();

});

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

function runTimes(nr, callback) {
    for (let i = 0; i < nr; i++) {
        callback()
    }
}
