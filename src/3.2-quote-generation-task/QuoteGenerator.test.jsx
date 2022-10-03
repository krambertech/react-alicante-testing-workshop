/**
 * 👉 TASK: Write tests for the QuoteGenerator component
 *
 * Now let's practice mocking when testing with this QuoteGenerator component
 *
 * Run tests with:
 * > npm test QuoteGenerator
 */

import { getByRole, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { fetchRandomQuote as mockFetchRandomQuote } from "./api";

import QuoteGenerator from "./QuoteGenerator";

// To mock API module:
jest.mock("./api");

/**
 * Write a test that it fetches and displays a random quote
 * from API. Make sure to check that loading indication is shown while loading
 *
 * 💡 Tips:
 * - You can mock the whole `api` module with `jest.mock("./api");`, alternatively you can mock `fetch`
 * - Important to note, that `testing-library` follows ARIA standards and the way they define
 *   [implicit roles](https://www.w3.org/TR/html-aria/#docconformance). Therefore you would see
 *   that there is no "blockquote" role. To get quote contents you can use `getByText` query
 * - To wait until loading finishes you have a few strategies, read more about them
 *   [here](https://testing-library.com/docs/dom-testing-library/api-async#waitfor)
 */
test("fetches and displays a random quote from API", async () => {
  const mockedQuote = {
    _id: "HBLejCmmWoIy",
    author: "John Snow",
    content: "Don't call me Lord Snow",
    length: 80,
    tags: [],
    dateAdded: "2020-01-01",
    dateModified: "2020-01-01",
  };
  mockFetchRandomQuote.mockResolvedValueOnce(mockedQuote);

  render(<QuoteGenerator />);

  expect(screen.getByRole("heading")).toHaveTextContent(/random quote/i);

  const generateButton = screen.getByRole('button', { name: /generate a random quote/i });
  expect(generateButton).toBeInTheDocument();

  userEvent.click(generateButton);

  const loading = screen.getByText(/loading/i);

  await waitForElementToBeRemoved(loading);

  expect(screen.getByText(/call me lord snow/i)).toBeInTheDocument();
  expect(screen.getByText(/john snow/i)).toBeInTheDocument();

  expect(mockFetchRandomQuote).toBeCalledTimes(1);
});

/**
 * Here you need to check that it allows to select category to user
 * and then  passes it to the API
 *
 * 💡 Tips:
 * - To find a select element use `getByRole("combobox")`
 * - To select an option from a select element use `userEvent.selectOptions`
 *   https://testing-library.com/docs/ecosystem-user-event/#selectoptionselement-values-options
 */
test("allows to select category and displays quote", async () => {
  // const mockedQuote = {
  //   _id: "HBLejCmmWoIy",
  //   author: "John Snow",
  //   content: "Don't call me Lord Snow",
  //   length: 80,
  //   tags: [],
  //   dateAdded: "2020-01-01",
  //   dateModified: "2020-01-01",
  // };
  mockFetchRandomQuote.mockResolvedValueOnce(mockQuote({ content: 'king in the north', author: 'Arya Stark' }));
  render(<QuoteGenerator />);

  expect(screen.getByRole('heading', { name: /random quote/i })).toBeInTheDocument();

  const combobox = screen.getByRole('combobox', { name: /choose category/i });
  userEvent.selectOptions(combobox, 'history');
  expect(screen.getByRole('option', { name: /history/i }).selected).toBeTruthy();

  const generateButton = screen.getByRole('button', { name: /generate a random quote/i });
  userEvent.click(generateButton);

  const loading = screen.getByText(/loading/i);
  await waitForElementToBeRemoved(loading);

  expect(screen.getByText(/king in the north/i)).toBeInTheDocument();
  expect(screen.getByText(/arya stark/i)).toBeInTheDocument();

  expect(mockFetchRandomQuote).toBeCalledTimes(1);
  expect(mockFetchRandomQuote).toBeCalledWith({ category: 'history' });
});

/**
 * 🚀 BONUS (TDD)
 * Currently `QuoteGenerator` component does not display an error state. Add a test case
 * that checks that it displays an error message when API call fails
 * and then implement the feature inside the component
 *
 * 💡 Tips:
 * - Use `.mockRejectedValueOnce` to mock API call failure (rejected promise)
 */

window.alert = jest.fn();

test("displays an error message when API call fails", async () => {
  mockFetchRandomQuote.mockRejectedValueOnce();

  render(<QuoteGenerator />);

  // select category generate quote
  const generateButton = screen.getByRole("button", {
    name: /generate a random quote/i,
  });
  userEvent.click(generateButton);

  expect(screen.queryByText(/loading.../i)).toBeInTheDocument();

  // wait for loading to finish
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  // check error message
  expect(screen.getByRole("alert")).toHaveTextContent(/something went wrong/i);
})

/**
 * 🚀 BONUS
 * Create a `mockQuote` function
 *
 * You might have noticed that we often need to write the same code to mock a quote.
 * Let's create a utility function that will help us make our tests more consice.
 * Create `mockQuote` function that accepts overrides and returns full object
 *
 * Example:
 * mockQuote({ content: "test" });
 *
 * Then use it in your tests to simplify mocking
 */
function mockQuote(overrides) {
  return {
    _id: "HBLejCmmWoIy",
    author: "John Snow",
    content: "Don't call me Lord Snow",
    length: 80,
    tags: [],
    dateAdded: "2020-01-01",
    dateModified: "2020-01-01",
    ...overrides
  }
}

