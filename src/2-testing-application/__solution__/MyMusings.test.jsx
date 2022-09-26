import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import mockApi from "../api";
import { mockMusing } from "../test/mocks";

import MyMusings from "./MyMusings";

jest.mock("../api");

test("renders list of musings from api", async () => {
  mockApi.getMyMusings.mockResolvedValue({
    data: [mockMusing({ text: "Pam pam" }), mockMusing({ text: "Boom boom" })],
    error: null,
  });

  render(<MyMusings />);
  expect(screen.getByText(/loading musings/i)).toBeInTheDocument();

  const status = await screen.findByText(/you have 2 musings/i);
  expect(status).toBeInTheDocument();

  const musings = screen.getAllByTestId("musing");
  expect(musings).toHaveLength(2);

  expect(musings[0]).toHaveTextContent("Pam pam");
  expect(musings[1]).toHaveTextContent("Boom boom");

  expect(mockApi.getMyMusings).toHaveBeenCalledTimes(1);
});

test("displays error message if api call failed", async () => {
  mockApi.getMyMusings.mockResolvedValue({
    data: null,
    error: {
      message: "Such error",
    },
  });

  render(<MyMusings />);
  expect(screen.getByText(/loading musings/i)).toBeInTheDocument();

  const errorMessage = await screen.findByRole("alert");
  expect(errorMessage).toHaveTextContent(/such error/i);
});

test("allows to create a new musing", async () => {
  const newMusing = mockMusing({ text: "Something wise" });

  mockApi.createMusing.mockResolvedValueOnce({
    data: [newMusing],
    error: null,
  });

  mockApi.getMyMusings.mockResolvedValueOnce({
    data: [],
    error: null,
  });

  render(<MyMusings />);

  // check empty state
  const emptyState = await screen.findByText(
    /you do not have any musings yet/i
  );
  expect(emptyState).toBeInTheDocument();

  // create musing
  const createMusingButton = screen.getByRole("button", {
    name: /new musing/i,
  });
  expect(createMusingButton).toBeInTheDocument();
  userEvent.click(createMusingButton);

  // dialog opened, enter text and submit
  const dialog = await screen.findByRole("dialog");
  expect(dialog).toBeInTheDocument();

  const input = within(dialog).getByLabelText(/write something/i);
  userEvent.type(input, newMusing.text);

  const saveButton = screen.getByRole("button", { name: /save/i });
  userEvent.click(saveButton);

  // dialog should be closed
  expect(saveButton).toHaveTextContent(/saving/i);
  await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));

  // check API was called with correct data
  expect(mockApi.createMusing).toHaveBeenCalledTimes(1);
  expect(mockApi.createMusing).toHaveBeenCalledWith({ text: newMusing.text });

  // check that musing was created
  const status = await screen.findByText(/you have 1 musing/i);
  expect(status).toBeInTheDocument();

  // check that new musing is displayed
  const musings = screen.getAllByTestId("musing");
  expect(musings).toHaveLength(1);
  expect(musings[0]).toHaveTextContent(newMusing.text);
  expect(musings[0]).toHaveTextContent("just now");
});

test("allows to delete musing", async () => {
  mockApi.getMyMusings.mockResolvedValueOnce({
    data: [
      mockMusing({ id: 1, text: "Boom" }),
      mockMusing({ id: 2, text: "Pam pam" }),
    ],
    error: null,
  });

  mockApi.deleteMusing.mockResolvedValueOnce({
    data: null,
    error: null,
  });

  render(<MyMusings />);

  // delete musing
  const [firstMusing, secondMusing] = await screen.findAllByTestId("musing");
  const deleteButton = within(firstMusing).getByRole("button", {
    name: /delete/i,
  });
  userEvent.click(deleteButton);

  // wait for it to be deleted
  await waitForElementToBeRemoved(firstMusing);

  // check that musing was deleted
  expect(screen.getAllByTestId("musing")).toHaveLength(1);
  expect(screen.getByText(/you have 1 musing/i)).toBeInTheDocument();
  expect(secondMusing).toBeInTheDocument();
});

test("allows to search for musings", async () => {
  mockApi.getMyMusings.mockResolvedValueOnce({
    data: [
      mockMusing({ text: "Hello" }),
      mockMusing({ text: "Welcome to hell" }),
      mockMusing({ text: "Boom" }),
    ],
    error: null,
  });

  render(<MyMusings />);
  expect(screen.getByText(/loading musings/i)).toBeInTheDocument();

  // check before search
  const musingsBeforeSearch = await screen.findAllByTestId("musing");
  expect(musingsBeforeSearch).toHaveLength(3);

  // search
  const searchInput = screen.getByRole("searchbox");
  userEvent.type(searchInput, "hell");

  // after search
  const searchStatus = await screen.findByText(/found 2 musings/i);
  expect(searchStatus).toBeInTheDocument();

  const musingsAfterSearch = screen.getAllByTestId("musing");
  expect(musingsAfterSearch).toHaveLength(2);
  expect(musingsAfterSearch[0]).toHaveTextContent(/hello/i);
  expect(musingsAfterSearch[1]).toHaveTextContent(/welcome to hell/i);
});
