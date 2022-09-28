/**
 * 👉 TASK: Component test for Modal component
 *
 * In this task we will learn how to test react components in isolation.
 * This is very similar to how you would test reusable components in your
 * design system
 */

import { render, screen } from "@testing-library/react";
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
  //  2. Check that Modal is visible
  //  3. Rerender Modal without `open` prop
  //  4. Check that Modal is not visible
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
test.todo(
  "displays close button if onClose provided and fires onClose when close button is clicked"
);

/**
 * 🚀 BONUS
 * Modal also supports Esc key to close the Modal. Let's test that.
 *
 * 💡 Tips:
 * - You can use `userEvent.keyboard` to simulate keyboard events
 *   https://testing-library.com/docs/user-event/keyboard/
 */
// test.todo("fires onClose when Escape is pressed");
