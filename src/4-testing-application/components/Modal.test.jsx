/**
 * 👉 TASK: Component test for Modal component
 *
 * In this task we will learn how to test react components in isolation.
 * This is very similar to how you would test reusable components in your
 * design system
 */

import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
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

/**
 * Let's check that `open` prop can control Modal's visibility
 *
 * 💡 Tips:
 * - You can use `rerender` function to re-render the component with new props
 *   https://testing-library.com/docs/react-testing-library/api/#rerender
 */
test("displays modal when it is open and does not displays when it is closed", () => {
  //  1. Render Modal with `open` prop
  render(<Modal open />)

  //  2. Check that Modal is visible
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  //  3. Rerender Modal without `open` prop
  const { rerender } = render(<Modal />)
  //  4. Check that Modal is not visible
  expect(screen.queryByRole('modal')).not.toBeInTheDocument();
});

/**
 * Let's check that `onClose` prop can be used to close the Modal. If it is provioded,
 * there should be a close button in the Modal. When the close button is clicked,
 * `onClose` prop should be called.
 *
 * 💡 Tips:
 * - In order to test this, we need to mock `onClose` prop.
 *   https://jestjs.io/docs/mock-function-api
 */

const onClose = jest.fn(() => setIsOpen(false))

test(
  "displays close button if onClose provided and fires onClose when close button is clicked"
  , () => {

    render(<Modal
      open
      title="New musing"
      onClose={onClose}
    />);

    //Check if dialog is open
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    //Check if it rendered correctly
    expect(screen.getByRole('heading', { name: /new musing/i })).toBeInTheDocument();

    //Does it have close button
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();

    userEvent.click(closeButton);

    //check if onClose prop is called
    expect(onClose).toBeCalledTimes(1);
  })

/**
 * 🚀 BONUS
 * Modal also supports Esc key to close the Modal. Let's test that.
 *
 * 💡 Tips:
 * - You can use `userEvent.keyboard` to simulate keyboard events
 *   https://testing-library.com/docs/user-event/keyboard/
 */
test("fires onClose when Escape is pressed", () => {
  render(<Modal
    open
    title="braap braap"
    onClose={onClose}
  />);

  //Check if dialog is open
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  //Check if it rendered correctly
  expect(screen.getByRole('heading', { name: /braap braap/i })).toBeInTheDocument();

  userEvent.keyboard('{Escape}');
  //check if onClose prop is called
  expect(onClose).toBeCalledTimes(1);
});
