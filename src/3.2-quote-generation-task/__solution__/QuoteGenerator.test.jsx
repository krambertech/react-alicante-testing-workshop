import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fetchRandomQuote as mockFetchRandomQuote } from "./api";

import QuoteGenerator from "./QuoteGenerator";

jest.mock("./api");

test("displays a quote from API", async () => {
  const quoteContent = "Don't call me Lord Snow";
  const quoteAuthor = "John Snow";
  mockFetchRandomQuote.mockResolvedValueOnce({
    _id: "HBLejCmmWoIy",
    author: quoteAuthor,
    content: quoteContent,
    length: 80,
    tags: [],
    dateAdded: "2020-01-01",
    dateModified: "2020-01-01",
  });

  render(<QuoteGenerator />);

  expect(screen.getByRole("heading")).toHaveTextContent(/random quote/i);

  // generate quote
  const generateButton = screen.getByRole("button", {
    name: /generate a random quote/i,
  });
  userEvent.click(generateButton);

  // wait for loading to finish
  const loading = screen.getByRole("status", { name: /loading/i });
  await waitForElementToBeRemoved(loading);

  // check quote
  expect(screen.getByText(quoteContent)).toBeInTheDocument();
  expect(screen.getByText(quoteAuthor)).toBeInTheDocument();

  // check API called correctly
  expect(mockFetchRandomQuote).toBeCalledTimes(1);
});

test("allows to select category and displays quote", async () => {
  const quoteContent = "Boom!";
  mockFetchRandomQuote.mockResolvedValueOnce({
    _id: "HBLejCmmWoIy",
    author: "Author Name",
    content: quoteContent,
    length: 80,
    tags: [],
    dateAdded: "2020-01-01",
    dateModified: "2020-01-01",
  });

  render(<QuoteGenerator />);

  // select category generate quote
  const select = screen.getByRole("combobox", { name: /choose category/i });
  userEvent.selectOptions(select, "sports");

  const generateButton = screen.getByRole("button", {
    name: /generate a random quote/i,
  });
  userEvent.click(generateButton);

  // wait for loading to finish
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  // check quote
  expect(screen.getByText(quoteContent)).toBeInTheDocument();

  // check API called correctly
  expect(mockFetchRandomQuote).toBeCalledTimes(1);
  expect(mockFetchRandomQuote).toBeCalledWith({ category: "sports" });
});

// 🚀 Bonus task: (TDD) Displays error if API call fails
test("displays error message if API fails", async () => {
  mockFetchRandomQuote.mockRejectedValueOnce();

  render(<QuoteGenerator />);

  // select category generate quote
  const generateButton = screen.getByRole("button", {
    name: /generate a random quote/i,
  });
  userEvent.click(generateButton);

  // wait for loading to finish
  await waitForElementToBeRemoved(() => screen.queryByText(/loading.../i));

  // check error message
  expect(screen.getByRole("alert")).toHaveTextContent(/something went wrong/i);
});

// 🚀 Bonus task: Create mock generator
const mockQuote = (overrides = {}) => ({
  _id: "HBLejCmmWoIy",
  author: "Quote Author",
  content: "Quote Content",
  length: 80,
  tags: [],
  dateAdded: "2020-01-01",
  dateModified: "2020-01-01",
  ...overrides,
});
