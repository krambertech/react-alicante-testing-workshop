import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Counter from "./Counter";

test("renders with initial value 0 and increment and decrement buttons", () => {
  render(<Counter />);

  expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /increment/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /decrement/i })
  ).toBeInTheDocument();
});

test("allows increment and decrement", () => {
  render(<Counter />);

  const incrementButton = screen.getByRole("button", { name: /increment/i });
  const decrementButton = screen.getByRole("button", { name: /decrement/i });

  expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

  // Increment 3 times
  userEvent.click(incrementButton);
  userEvent.click(incrementButton);
  userEvent.click(incrementButton);

  expect(screen.getByText(/count: 3/i)).toBeInTheDocument();

  // Decrement 2 times
  userEvent.click(decrementButton);
  userEvent.click(decrementButton);

  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});

// 🚀 Bonus task: Allows to set initial value via props
test("allows to set initial value", () => {
  render(<Counter initialCount={5} />);

  expect(screen.getByText(/count: 5/i)).toBeInTheDocument();

  // increment 2 times
  const incrementButton = screen.getByRole("button", { name: /increment/i });
  userEvent.click(incrementButton);
  userEvent.click(incrementButton);

  expect(screen.getByText(/count: 7/i)).toBeInTheDocument();
});

// 🚀 Bonus task: Does not allow to go below min and above max
test("does not allow to go below min and above max", () => {
  render(<Counter min={1} max={3} />);

  const decrementButton = screen.getByRole("button", { name: /decrement/i });
  const incrementButton = screen.getByRole("button", { name: /increment/i });

  // initial value = 1, decrement is disabled
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  expect(decrementButton).toBeDisabled();

  // increment 2 times
  userEvent.click(incrementButton);
  userEvent.click(incrementButton);

  expect(screen.getByText(/count: 3/i)).toBeInTheDocument();
  expect(incrementButton).toBeDisabled();
});

// 🚀 Bonus task: Write a helper runTimes function that
function runTimes(n, fn) {
  for (let i = 0; i < n; i++) {
    fn();
  }
}

// a dummy test just to illustrate how it is used
test("increment 10 times", () => {
  render(<Counter max={20} />);

  runTimes(10, () =>
    userEvent.click(screen.getByRole("button", { name: /increment/i }))
  );

  expect(screen.getByText(/count: 10/i)).toBeInTheDocument();
});
