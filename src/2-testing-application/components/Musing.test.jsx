import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Musing from "./Musing";

test("displays musing text and formatted date", () => {
  render(
    <Musing
      id={1}
      text="Hello, world!"
      createdAt={new Date(Date.now() - 60_000).toISOString()}
    />
  );

  expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  expect(screen.getByText("1 minute ago")).toBeInTheDocument();
});

test("displays delete button and fires onDelete when delete button is clicked", () => {
  const onDelete = jest.fn();
  render(
    <Musing
      id={5}
      text="Hello, world!"
      createdAt={new Date().toISOString()}
      onDelete={onDelete}
    />
  );

  // delete
  const deleteButton = screen.getByRole("button", { name: /delete/i });
  expect(deleteButton).toBeInTheDocument();
  userEvent.click(deleteButton);

  // check if onDelete was called
  expect(onDelete).toHaveBeenCalledTimes(1);
  expect(onDelete).toHaveBeenCalledWith(5);
});
