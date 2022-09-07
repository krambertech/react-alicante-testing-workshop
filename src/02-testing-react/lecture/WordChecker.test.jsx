import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WordChecker from "./WordChecker";

test("renders input with correct label", () => {
  render(<WordChecker />);

  const input = screen.getByLabelText(/enter a word/i);
  expect(input).toBeInTheDocument();
});

test("displays alert when word is too long", () => {
  render(<WordChecker maxLength={9} />);

  const input = screen.getByLabelText(/word/i);
  userEvent.type(input, "abrakadabra");

  const alert = screen.getByRole("alert");
  expect(alert).toHaveTextContent(/bad word/i);
});

test("displays alert when word is too short", () => {
  render(<WordChecker minLength={5} />);

  const input = screen.getByLabelText(/word/i);
  userEvent.type(input, "cat");

  expect(screen.getByRole("alert")).toHaveTextContent(/bad word/i);
});

test("displays success message when the word is correct length", () => {
  const { rerender } = render(<WordChecker minLength={5} maxLength={10} />);

  const input = screen.getByLabelText(/word/i);
  userEvent.type(input, "tallinn");

  expect(screen.getByRole("status")).toHaveTextContent(/good word/i);

  rerender(<WordChecker minLength={8} maxLength={12} />);

  expect(screen.queryByRole("status", { name: /good word/i })).toBeNull();
  expect(screen.getByRole("alert")).toHaveTextContent(/bad word/i);
});
