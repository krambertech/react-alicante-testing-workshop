/**
 * 👉 TASK: Write integration tests for the MyMusings component
 *
 * In this task we will learn how to test react components in integration.
 * In front-end application, we can consider test and integration tests if
 * it is testing multiple units together.
 */

import { render, screen, waitFor, waitForElementToBeRemoved, within } from "@testing-library/react";
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
  screen.getallbyid
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

/**
 * Test creation of the new musing, this will be an integration test
 * which will cover several modules at once, for example:
 * - MyMusings component
 * - NewMusing component
 * - Musing component
 * - Modal component
 * - several utils and hooks
 *
 * With one test! Wow!
 *
 * 💡 Tips:
 * - You would need to mock 2 API calls (getMyMusings and createMusing)
 * - In `test/mocks` you can already find mocks for the returned data,
 *   you can just use `mockMusing` to generate a mock
 */
test("allows to create a new musing", async () => {
  mockApi.getMyMusings.mockResolvedValueOnce({
    data: [mockMusing({ text: "Mock mock" })],
    error: null,
  });

  mockApi.createMusing.mockResolvedValueOnce({
    data: [mockMusing({ text: "Smock smock" })],
    error: null,
  });

  render(<MyMusings />);

  // Test scenario:
  // 1. First, wait until the existing list of items is displayed.
  const status = await screen.findByText(/you have 1 musing/i);
  expect(status).toBeInTheDocument();

  // 2. Then, click on the "New musing" button.
  const newMusingButton = screen.getByRole('button', { name: /new musing/i });
  userEvent.click(newMusingButton);

  // 3. Then, wait until the dialog (you can use role `dialog`) is displayed.
  const dialog = await screen.getByRole('dialog');
  expect(dialog).toBeInTheDocument();

  // 4. Then, fill in the input (label: Write something) and click on the "Save" button.
  const saveButton = screen.getByRole('button', { name: /save/i })
  const input = screen.getByLabelText(/write something/i);

  userEvent.type(input, "Smock smock");
  userEvent.click(saveButton);
  expect(saveButton).toHaveTextContent(/saving/i);

  // 5. Then, wait until the dialog is closed (Tip: you  can use `waitForElementToBeRemoved`).
  await waitForElementToBeRemoved(() => screen.getByRole('dialog'));

  // 6. Then, wait until the new item is displayed in the list.
  const statusNew = await screen.findByText(/you have 2 musings/i);
  expect(statusNew).toBeInTheDocument();

  const musings = await screen.getAllByTestId('musing');
  expect(musings.length).toBe(2);
  expect(musings[0]).toHaveTextContent(/smock smock/i);
  expect(musings[1]).toHaveTextContent(/mock mock/i);


  // 7. Then, check that API has been called correctly
  expect(mockApi.getMyMusings).toBeCalledTimes(1);
  expect(mockApi.createMusing).toBeCalledTimes(1);
  expect(mockApi.createMusing).toBeCalledWith({ text: "Smock smock" });
});

/**
 * 🚀 BONUS
 * Allows to delete a musing
 *
 * Check that musing can be deleted from the list by clicking delete button on a card
 *
 * 💡 Tips:
 * - You can use `waitForElementToBeRemoved` to ensure the item was removed from the list
 *   after clicking on the delete button
 * - To get a list of elements, you can use `getAllByTestId` and then find the element in the array
 * - To find specific delete button, you can use `within` helper to narrow selection down
 *   https://testing-library.com/docs/dom-testing-library/api-within/
 */
test("allows to delete musing", async () => {
  mockApi.getMyMusings.mockResolvedValueOnce({
    data: [
      mockMusing({ text: "Mock mock" }),
      mockMusing({ text: "Smock smock" })],
    error: null,
  });

  mockApi.deleteMusing.mockResolvedValueOnce({
    data: null,
    error: null,
  });

  render(<MyMusings />);

  const musings = await screen.findAllByTestId('musing');
  expect(musings.length).toBe(2);
  expect(musings[0]).toHaveTextContent(/mock mock/i);

  const deleteButton = within(musings[0]).queryByRole('button', { name: /delete/i });
  userEvent.click(deleteButton);

  await waitForElementToBeRemoved(musings[0]);
  const newMusings = screen.getAllByTestId('musing');
  expect(newMusings.length).toBe(1);
})

/**
 * 🚀 BONUS (TDD)
 * Allows to search for musings
 *
 * Check that you can search for musings in the list by keyword
 *
 * 💡 Tips:
 * - You can use `waitForElementToBeRemoved` to ensure the item was removed from the list
 *   after clicking on the delete button
 * - To find specific delete button, you can use `within` helper to narrow selection down
 *   https://testing-library.com/docs/dom-testing-library/api-within/
 */
// test.todo("allows to search for musings");

/**
 * 🚀 BONUS
 * Opens New musing form by pressing "n" key
 *
 * This component actually supports a shortcut to open the new musing form.
 *
 * 💡 Tips:
 * - You can use `userEvent.keyboard` to simulate keyboard events
 */
test("opens new musing form by pressing n key", async () => {
  mockApi.getMyMusings.mockResolvedValueOnce({
    data: [],
    error: null,
  });
  render(<MyMusings />);

  //Wait to render status
  const status = await screen.findByText(/you do not have any musings yet.../i);
  expect(status).toBeInTheDocument();

  userEvent.keyboard('n');

  //Find dialog element
  const dialog = await screen.findByRole('dialog');
  expect(dialog).toBeInTheDocument();
})
