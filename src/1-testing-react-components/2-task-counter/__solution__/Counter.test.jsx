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

// 🚀 Bonus task: (TDD) Displays alert if count becomes out of boundaries
test("displays alert if count becomes out of boundaries", () => {
  const { rerender } = render(<Counter min={2} max={5} />);
  const incrementButton = screen.getByRole("button", { name: /increment/i });

  // increment 2 times
  expect(screen.getByText(/count: 2/i)).toBeInTheDocument();
  userEvent.click(incrementButton);
  userEvent.click(incrementButton);

  expect(screen.getByText(/count: 4/i)).toBeInTheDocument();
  expect(incrementButton).not.toBeDisabled();

  // rerender with new min and max
  rerender(<Counter min={1} max={3} />);

  // assert that count is still 4, increment button is disabled and alert is disolayed
  expect(screen.getByText(/count: 4/i)).toBeInTheDocument();
  expect(screen.getByRole("alert")).toHaveTextContent(
    /the count is out of range/i
  );
  expect(incrementButton).toBeDisabled();
});

// 🚀 Bonus task: Create `runTimes` test utility function
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
