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

test.todo("allows to create a new musing");

// 🚀 Bonus task: Allows to delete a musing
// test.todo("allows to delete musing");

// 🚀 Bonus task: Allows to search for musings
// test.todo("allows to search for musings");
