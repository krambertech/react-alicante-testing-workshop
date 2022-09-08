# Module 2 - Testing React

We just covered testing JavaScript code and now it is time to talk more on we can apply same pronciples when testing React apps.

## 🐇 Jump around <!-- omit in toc -->

- [✨ Summary](#-summary)
- [📝 Notes](#-notes)
  - [Part 1: Testing React component](#part-1-testing-react-component)
  - [Part 2: Testing async components and mocking](#part-2-testing-async-components-and-mocking)
- [👩‍💻 Tasks](#-tasks)
  - [Task 2.1: Add tests for Counter component](#task-21-add-tests-for-counter-component)
  - [Task 2.2: Cover quote generation component with tests](#task-22-cover-quote-generation-component-with-tests)
  - [Task 2.3 (🎁 BONUS): Write tests for greeting component](#task-23--bonus-write-tests-for-greeting-component)
- [💡 Feedback](#-feedback)
- [📚 Materials](#-materials)


## ✨ Summary

- introduction to `react-testing-library`
- `userEvent` for user interactions
- testing React components
- API mocking

## 📝 Notes

### Part 1: Testing React component

Let's start with simple React component that we would like to cover with tests. This component checks the length of the word and provides different message depending on whether the word is within the boundaries or not.

```jsx
export default function WordChecker({ minLength = 3, maxLength = 7 }) {
  const [word, setWord] = useState("");

  const handleChange = (e) => {
    setWord(e.target.value);
  };

  return (
    <div>
      <h3>Check the word</h3>
      <label htmlFor="word">Enter a word</label>
      <input id="word" value={word} onChange={handleChange} />
      {word.length <= maxLength && word.length >= minLength ? (
        <p role="status">👌 Good word!</p>
      ) : (
        <p role="alert">
          🚫 Bad word!
        </p>
      )}
    </div>
  );
}
```

Let's start simple, let's test that component renders correct heading.

We can start by creating a test file `WordChecker.test.jsx` and writing an empty test case. If we log out `console.log(<WordChecker />)` we will see that it returns the Virtual DOM node.

<details>
  <summary>Output</summary>

  ```
    {
      '$$typeof': Symbol(react.element),
      type: [Function: WordChecker],
      key: null,
      ref: null,
      props: {},
      _owner: null,
      _store: {}
    }
  ```
</details>

We need to render it to receive actual DOM tree.

<details>
  <summary>Interesting tip</summary>

  If we try to log out innerHTML, we would see empty string.

  ```jsx
  const div = document.createElement("div")
  const root = ReactDOM.createRoot(div);
  root.render(<WordChecker />); 

  console.log(div.innerHTML)
  ```
  
  Why is that? Since React v18 root.render became async, so we need to take that into account

  ```jsx
  const waitNextTick = () => new Promise((resolve) => setTimeout(resolve, 0));
  
  test("renders header", async () => {
    const div = document.createElement("div")
    const root = ReactDOM.createRoot(div);
    root.render(<WordChecker />);

    await waitNextTick();
    console.log(div.innerHTML);
  });
  ```

  But there is also react's [test utils](https://reactjs.org/docs/test-utils.html) we can use [renderIntoDocument() ](https://reactjs.org/docs/test-utils.html#renderintodocument) instead, which would not have that problem:

  ```jsx
  const container = renderIntoDocument(<WordChecker />)
  ```
</details>

When we log `console.log(container.innerHTML)` we would see:

```jsx
const container = renderIntoDocument(<WordChecker />);
console.log(container.innerHTML)
```


```html
<div><h3>Check the word</h3><label for="word">Enter a word</label><input id="word" value=""><p role="alert">🚫 Bad word!</p></div>
```

Now we can try to find heading and check that its content is "Check the word".

```js
console.log(div.querySelector("h3").textContent) // "Check the word"
```

Now we can write an assertion:

```js
expect(div.querySelector("h3").textContent).toBe("Check the word");
```

Congratulations! We just wrote our first assertion for React component. But it is a bit fussy and requires a lot of code. 

**Introducing -- [DOM testing library](https://testing-library.com/docs/dom-testing-library/intro/) ✨** It is a very light-weight solution for testing DOM nodes.

Let's try it!

```jsx
import { getByRole } from '@testing-library/dom';

test("renders header", async () => {
  const div = document.createElement("div")
  const root = ReactDOM.createRoot(div);
  root.render(<WordChecker />);
  await waitNextTick();

  expect(getByRole(div, "heading").textContent).toBe("Check the word")
})
```

Though our matching does not look very convenient. Lucky that DOM testing library comes with [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom), which extends Jest's default matchers.

It is already included in Create React App in `setupTests.js`:
```js
import '@testing-library/jest-dom';
```

Now we can refactor out matcher:
```jsx
// before
expect(getByRole(div, "heading").textContent).toBe("Check the word")

// after
expect(getByRole(div, "heading")).toHaveTextContent(/check the word/i);
```

Following the same principles we can write more matchers, for example, for input:

```jsx
test("renders header and input", async () => {
  // ...
  expect(getByRole(div, "heading")).toHaveTextContent(/check the word/i);
  expect(getByLabelText(div, "Enter a word")).toBeInTheDocument();
})
```

If we are to add more tests, there is quite a lot of code to copy around: 

```jsx
const div = document.createElement("div")
const root = ReactDOM.createRoot(div);
root.render(<WordChecker />);
```

Luckily for us, there is also an awesome [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)! It builds on top of DOM Testing Library by adding APIs for working with React components.

It exposes `render` method which we can use to render React components conveniently. And `screen` utility to simplify usage of all queries.

With this, our test would look like this:

```jsx
import { render, screen } from "@testing-library/react";

test("renders header and input", () => {
  render(<WordChecker />);

  expect(screen.getByRole("heading")).toHaveTextContent(/check the word/i);
  expect(screen.getByLabelText("Enter a word")).toBeInTheDocument();
});
```

Now, let's write more tests. Next up, we would need to fire events in the tests. We would need to type text into the input and check whether alert is shown.

React testing library ships with `fireEvent` utility that helps to fire events in our tests.

```jsx
test("displays alert when word is too long", () => {
  render(<WordChecker maxLength={9} />);

  const input = screen.getByLabelText(/enter a word/i);
  fireEvent.change(input, { target: { value: "abrakadabra" } });

  const alert = screen.getByRole("alert");
  expect(alert).toHaveTextContent(/bad word/i);
});
```

While `fireEvent` is very useful it dispatches DOM events and they do not work in the same way as the events when user interacts with web interface.

For example, in order ty type into the input, under the hood all these events actually happen: onFocus, onKeyPress, onKeyDown, onChange, onBlur etc.

Therefore if in our tests we want to simulate the user behavior in the most accurate way, we would need to dispatch a lot of events 😅

Enter [user-event](https://testing-library.com/docs/user-event/intro), it provides a convenient abstraction on top of fireEvent that simulates actual user behavior.

```jsx
test("displays alert when word is too long", () => {
  render(<WordChecker maxLength={9} />);

  const input = screen.getByLabelText(/enter a word/i);
  userEvent.type(input, "abrakadabra");

  const alert = screen.getByRole("alert");
  expect(alert).toHaveTextContent(/bad word/i);
});
```

Now, in sinilar fashion we can write the rest of the tests. But there is something I want to highlight -- testing rerenders.

When you are using components in real life, you often change their props which causes them to rerender. This an important bahavior to test. For example, our component accepts `maxLength` prop. If we change it, and the world is already entered, it shoukd influence whether alert is displayed or not.

react-testig-library's `render` method returns `rerender` function to do just that.

```jsx
test("displays success message when the word is at correct length", async () => {
  const { rerender } = render(<WordChecker maxLength={10} />);

  // enter a word that satisfied maxLength
  userEvent.type(screen.getByLabelText(/enter a word/i), "tallinn");
  expect(screen.getByRole("alert")).toHaveTextContent(/good word/i);

  // rerender with new maxLength
  rerender(<WordChecker maxLength={12} />);

  // check the changes, alert needs to be displayed
  expect(screen.getByRole("alert")).toHaveTextContent(/bad word/i);
  expect(screen.queryByRole("status")).toBeNull();
});
```

**👉 👉 👉 Task 2.1**

### Part 2: Testing async components and mocking

<!-- Now, let's take on testing a more complex React component. Let's test `Login` component, it allows to enter password and calls mock API to check whether the password is correct.

If it is correct, it shows a success message. If it is incorrect, it shows an error message.

<details>
  <summary>Login.jsx</summary>

  ```jsx
  import { useState } from "react";
  import { logIn } from "./api";

  export default function Login() {
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("none");

    const handleChangePassword = (e) => {
      setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("loading");

      try {
        await logIn({ password });
        setStatus("success");
      } catch {
        setStatus("failure");
      }

      setPassword("");
    };

    return (
      <div>
        <h3>Log in</h3>
        {status === "success" ? (
          <h1>✨ Welcome! You are logged in! ✨</h1>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handleChangePassword}
            />
            <button type="submit" disabled={!password}>
              🔒 Log in
            </button>
            {status === "loading" ? <p role="status">Logging in...</p> : null}
            {status === "failure" ? (
              <p role="alert">Log in failed, try a different password</p>
            ) : null}
          </form>
        )}
      </div>
    );
  }
  ```
</details>

First let's cover existing logic with tests. Let's start by checking that it renders login form correctly.

```jsx
test("renders login form with disabled button", async () => {
  render(<Login />);

  // headoing is rendered
  expect(screen.getByRole("heading")).toHaveTextContent(/log in/i);

  // password input is rendered and empty
  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).toHaveValue("");

  // submit button is disabled when password empty
  const submitButton = screen.getByRole("button", { name: /log in/i });
  expect(submitButton).toBeDisabled();
});
```

Done! But now we need somehow to test how the form works with API. Jest has a handy set of [mocking tools](https://jestjs.io/docs/mock-functions) that allow us to mock API calls, modules, functions, etc.

To use it we can:

```js
// mock the whole api module
jest.mock("./api");

// then, when we import that module, Jest will automnatcally mock it
import { logIn as mockLogIn } from "./api";


``` -->

*This part lacks transcript for now, it will be added later!*

## 👩‍💻 Tasks

### Task 2.1: Add tests for Counter component

Now it's time for you to practice testing React components on your own. I prepared Counter component that you would need to cover with a set of tests. Head to `/task-01-counter` and open `Counter.test.jsx` file.

### Task 2.2: Cover quote generation component with tests

Head to `/task-02-quotes`, there you will find small component that generates random quotes using REST API. Open `Quote.test.jsx` file and cover its logic with tests utilizing the principles we just learned right now.

🎁 Bonus task: Add loading indication feature through TDD

### Task 2.3 (🎁 BONUS): Write tests for greeting component

ℹ️ *Bonus tasks can be completed if you finished early with main tasks or at home*

Head to `/task-03-welcome`, there you will find small component that generates random quotes using REST API.

Open `Welcome.test.jsx` file and cover its existing logic with tests. And then use TDD approach to add new functionality to it:
- Field should clean itself after "Greet me" clicked
- "Greet me" button should be disabled when field is empty
- Display warning if user enters the same name twice

## 💡 Feedback

**[https://r3coqpp2ta3.typeform.com/to/IgAPpCK4](https://r3coqpp2ta3.typeform.com/to/IgAPpCK4)**

## 📚 Materials

- [DOM testing library](https://testing-library.com/docs/dom-testing-library/example-intro)
- [Queries in testing library](https://testing-library.com/docs/queries/about/)
- [Write fewer, longer tests](https://kentcdodds.com/blog/write-fewer-longer-tests)
- [Jest's Mock API](https://jestjs.io/docs/mock-function-api)
- [Async methods in `testing-library`](https://testing-library.com/docs/dom-testing-library/api-async)
