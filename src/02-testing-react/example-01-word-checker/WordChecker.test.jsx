import React from "react";
import { act } from 'react-dom/test-utils';
import ReactDOM from "react-dom/client";
// import { getByRole, getByLabelText } from "@testing-library/dom";
import { fireEvent, render, screen } from "@testing-library/react";
// // import userEvent from "@testing-library/user-event";
import WordChecker from "./WordChecker";
import userEvent from "@testing-library/user-event";

test("renders heading and input with correct label", () => {
  render(<WordChecker />);

  expect(screen.getByRole("heading")).toHaveTextContent(/check the word/i);

  const input = screen.getByLabelText(/enter a word/i);
  expect(input).toBeInTheDocument();
});

test("displays alert when word is too long", async () => {
  render(<WordChecker maxLength={9} />);

  const input = screen.getByLabelText(/word/i);
  userEvent.type(input, "abrakadabra");

  const alert = screen.getByRole("alert");
  expect(alert).toHaveTextContent(/bad word/i);
});

test("displays alert when word is too short", async () => {
  render(<WordChecker minLength={5} />);

  const input = screen.getByLabelText(/enter a word/i);
  userEvent.type(input, "cat");

  expect(screen.getByRole("alert")).toHaveTextContent(/bad word/i);
});

test("displays success message when the word is at correct length", async () => {
  const { rerender } = render(<WordChecker minLength={5} maxLength={10} />);

  const input = screen.getByLabelText(/word/i);
  userEvent.type(input, "tallinn");

  expect(screen.getByRole("alert")).toHaveTextContent(/good word/i);

  rerender(<WordChecker minLength={8} maxLength={12} />);

  expect(screen.getByRole("alert")).toHaveTextContent(/bad word/i);
  expect(screen.queryByRole("status")).toBeNull();
});
