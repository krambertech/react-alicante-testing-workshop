import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Modal from "./Modal";

test("renders children and title when open", () => {
  render(
    <Modal open title="Title">
      Children
      <button>Button</button>
    </Modal>
  );

  expect(screen.getByRole("dialog")).toBeInTheDocument();

  expect(screen.getByRole("heading")).toHaveTextContent("Title");
  expect(screen.getByText("Children")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
});

test("displays modal when it is open and does not displays when it is closed", () => {
  const { rerender } = render(<Modal open>Hello!</Modal>);

  expect(screen.getByRole("dialog")).toHaveTextContent(/hello/i);

  rerender(<Modal>Hello!</Modal>);
  expect(screen.queryByRole("dialog")).toBeNull();

  rerender(<Modal open>Hello!</Modal>);
  expect(screen.getByRole("dialog")).toHaveTextContent(/hello/i);
});

test("displays close button if onClose provided and fires onClose when close button is clicked", () => {
  const onClose = jest.fn();
  const { rerender } = render(
    <Modal open onClose={onClose}>
      Hello!
    </Modal>
  );

  expect(screen.getByRole("dialog")).toBeInTheDocument();
  const closeButton = within(screen.getByRole("dialog")).getByRole("button", {
    name: /close/i,
  });

  userEvent.click(closeButton);

  expect(onClose).toHaveBeenCalled();
  rerender(<Modal onClose={onClose}>Hello!</Modal>);

  expect(screen.queryByRole("dialog")).toBeNull();
});

// 🚀 Bonus task: Fires onClose when Escape is pressed
test("fires onClose closes when Escape is pressed", () => {
  const onClose = jest.fn();
  render(
    <Modal open onClose={onClose}>
      Hello!
    </Modal>
  );

  expect(screen.getByRole("dialog")).toBeInTheDocument();
  userEvent.keyboard("{Escape}");
  expect(onClose).toHaveBeenCalled();
});
