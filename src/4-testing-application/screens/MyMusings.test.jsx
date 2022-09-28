/**
 * 👉 TASK: Write integration tests for the MyMusings component
 *
 * In this task we will learn how to test react components in integration.
 * In front-end application, we can consider test and integration tests if
 * it is testing multiple units together.
 */

import { render, screen } from "@testing-library/react";

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
    data: [],
    error: null,
  });

  render(<MyMusings />);

  // Test scenario:
  // 1. First, wait until the existing list of items is displayed.
  // 2. Then, click on the "New musing" button.
  // 3. Then, wait until the dialog (you can use role `dialog`) is displayed.
  // 4. Then, fill in the input (label: Write something) and click on the "Save" button.
  // 5. Then, wait until the dialog is closed (Tip: you  can use `waitForElementToBeRemoved`).
  // 6. Then, wait until the new item is displayed in the list.
  // 7. Then, check that API has been called correctly
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
// test.todo("allows to delete musing");

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
// test.todo("opens new musing form by pressing n key");
