import Welcome from "./Welcome";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("shows greeting for submitted name and cleans input after", () => {
  render(<Welcome />);

  const nameInput = screen.getByLabelText(/name/i);
  const submitButton = screen.getByRole("button", { name: /greet me/i });

  userEvent.type(nameInput, "finnick");
  userEvent.click(submitButton);

  expect(screen.getByRole("heading")).toHaveTextContent(/hello, finnick/i);
  expect(nameInput).toHaveValue("");
});

test("does not allow submit empty name", () => {
  render(<Welcome />);

  const submitButton = screen.getByRole("button", { name: /greet me/i });

  expect(submitButton).toBeDisabled();
  expect(screen.queryByRole("heading")).toBeNull();
});

test("shows warning when submitting same name", () => {
  render(<Welcome />);

  const nameInput = screen.getByLabelText(/name/i);
  const submitButton = screen.getByRole("button", { name: /greet me/i });

  userEvent.type(nameInput, "finnick");
  userEvent.click(submitButton);

  expect(screen.getByRole("heading")).toHaveTextContent(/hello, finnick/i);
  expect(nameInput).toHaveValue("");

  userEvent.type(nameInput, "finnick");
  userEvent.click(submitButton);

  expect(screen.getByRole("alert")).toHaveTextContent(/this is the same name/i);
  expect(nameInput).toHaveValue("");
});
