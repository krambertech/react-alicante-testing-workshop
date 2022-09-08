import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Yell from "./Yell";

test("opens alert when button is clicked", () => {
  // mocked alert
  window.alert = jest.fn();

  render(<Yell />);

  const button = screen.getByRole("button", { name: /yell at me/i });
  userEvent.click(button);

  expect(window.alert).toBeCalledTimes(1);
  expect(window.alert).toBeCalledWith("HEY!");
});

test("fires onBeenYelled after alert", () => {
  window.alert = jest.fn();
  const onBeenYelled = jest.fn();

  render(<Yell onBeenYelled={onBeenYelled} />);

  const button = screen.getByRole("button", { name: /yell at me/i });
  userEvent.click(button);

  expect(onBeenYelled).toBeCalledTimes(1);
});

test("runs generateYellMessage if provided", () => {
  window.alert = jest.fn();
  const generateYellMessage = jest
    .fn()
    .mockReturnValueOnce("HEY!")
    .mockReturnValueOnce("WHAT!");

  render(<Yell generateYellMessage={generateYellMessage} />);

  const button = screen.getByRole("button", { name: /yell at me/i });
  userEvent.click(button);
  userEvent.click(button);

  expect(window.alert).toHaveBeenNthCalledWith(1, "HEY!");
  expect(window.alert).toHaveBeenNthCalledWith(2, "WHAT!");
});
