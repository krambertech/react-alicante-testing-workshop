import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { logIn as mockLogIn } from "./api";
import Login from "./Login";

jest.mock("./api");

test("renders login form with disabled button", async () => {
  render(<Login />);

  // password input is rendered
  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();

  // submit button is disabled when password empty
  const submitButton = screen.getByRole("button", { name: /log in/i });
  expect(submitButton).toBeDisabled();

  // submit button is enabled when password is entered
  userEvent.type(passwordInput, "something");
  expect(submitButton).not.toBeDisabled();

  // welcome message is not displayed
  expect(
    screen.queryByRole("heading", { name: /welcome. you are logged in/i })
  ).toBeNull();
});

test("allows to log in with correct password", async () => {
  mockLogIn.mockResolvedValueOnce({ success: true });

  render(<Login />);

  //enter password and submit
  const passwordInput = screen.getByLabelText(/password/i);
  userEvent.type(passwordInput, "password");

  const submitButton = screen.getByRole("button", { name: /log in/i });
  userEvent.click(submitButton);

  // check loading message
  const loadingMessage = screen.getByRole("status");
  expect(loadingMessage).toHaveTextContent(/logging in/i);

  // check user logged in
  await waitForElementToBeRemoved(loadingMessage);
  expect(screen.getByText(/Welcome! You are logged in!/)).toBeInTheDocument();

  // make sure API called correctly
  expect(mockLogIn).toBeCalledWith({ password: "password" });
  expect(mockLogIn).toBeCalledTimes(1);
});

test("shows error when logging in with wrong password", async () => {
  mockLogIn.mockRejectedValueOnce({ success: false });

  render(<Login />);

  // enter wrong password
  const passwordInput = screen.getByLabelText(/password/i);
  userEvent.type(passwordInput, "wrong password");

  const submitButton = screen.getByRole("button", { name: /log in/i });
  userEvent.click(submitButton);

  // alert displayed
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent(
      /log in failed, try a different password/i
    )
  );

  // make sure API called correctly
  expect(mockLogIn).toBeCalledWith({ password: "wrong password" });
  expect(mockLogIn).toBeCalledTimes(1);
});
