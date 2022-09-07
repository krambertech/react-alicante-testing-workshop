// 👉 TASK: Write tests for <Counter /> component
// Make sure to cover different cases with tests and with different set of props
// You decide yourself on the set of tests you want to add
//
// 🎁 BONUS TASK: add a set of tests for when props get changed
//
// Run your tests with:
//   npm test Counter

import Counter from "./Counter";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("renders with initial value 0 and allows increment and decrement", () => {
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

test("makes button disabled when rerendered if number is out of range", () => {
  const { rerender } = render(<Counter min={2} max={5} />);

  const incrementButton = screen.getByRole("button", { name: /increment/i });

  // increment 2 times
  userEvent.click(incrementButton);
  userEvent.click(incrementButton);

  expect(screen.getByText(/count: 4/i)).toBeInTheDocument();
  expect(incrementButton).not.toBeDisabled();

  rerender(<Counter min={1} max={3} />);

  expect(screen.getByText(/count: 4/i)).toBeInTheDocument();
  expect(incrementButton).toBeDisabled();
});

// 💡 TIPS:
// To test rerender, use rerender method from react-testing-library
// https://testing-library.com/docs/react-testing-library/api/#rerender
//
// Good luck! 🍀
