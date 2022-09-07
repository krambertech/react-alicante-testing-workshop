// 👉 TASK: Write tests for <Counter /> component
// Make sure to cover different cases with tests and with different set of props
// You decide yourself on the set of tests you want to add
//
// 🎁 BONUS TASK: add a set of tests for when props get changed
//
// Run your tests with:
//   npm test multiply

import Counter from "./Counter";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

test("renders counter with initial value 0", () => {
  render(<Counter />);

  const incrementButton = screen.getByRole("button", { name: /increment/i });
  const decrementButton = screen.getByRole("button", { name: /decrement/i });

  // Increment 3 times
  userEvent.click(incrementButton);
  userEvent.click(incrementButton);
  userEvent.click(incrementButton);

  expect(screen.getByRole("heading")).toHaveTextContent("3");

  // Decrement 2 times
  userEvent.click(decrementButton);

  expect(screen.getByRole("heading")).toHaveTextContent("2");
});

test("does not allow to go below min and above max", () => {
    render(<Counter min={} />);
  
    const incrementButton = screen.getByRole("button", { name: /increment/i });
    const decrementButton = screen.getByRole("button", { name: /decrement/i });
  
    // Increment 3 times
    userEvent.click(incrementButton);
    userEvent.click(incrementButton);
    userEvent.click(incrementButton);
  
    expect(screen.getByRole("heading")).toHaveTextContent("3");
  
    // Decrement 2 times
    userEvent.click(decrementButton);
  
    expect(screen.getByRole("heading")).toHaveTextContent("2");
  });

  test("does not allow to go below min and above max", () => {
    render(<Counter min={} />);
  
    const incrementButton = screen.getByRole("button", { name: /increment/i });
    const decrementButton = screen.getByRole("button", { name: /decrement/i });
  
    // Increment 3 times
    userEvent.click(incrementButton);
    userEvent.click(incrementButton);
    userEvent.click(incrementButton);
  
    expect(screen.getByRole("heading")).toHaveTextContent("3");
  
    // Decrement 2 times
    userEvent.click(decrementButton);
  
    expect(screen.getByRole("heading")).toHaveTextContent("2");
  });

// 💡 TIPS:
// To test rerender, use rerender method from react-testing-library
// https://testing-library.com/docs/react-testing-library/api/#rerender
//
// Good luck! 🍀
