# Module 2 - Testing React application

Now, let's apply everything we learned and practiced to a scenario closer to real life, where we test React application. Application uses `supabase` for auth and basec operations. 

It allows user to sign up, log in and log out. It also allows to create, editm search and delete musings. Throughout this module we will learn to apply everything we learned in previous modules to a real life scenario.

You can access application from local dev server by running `npm start` and opening [http://localhost:3000/](http://localhost:3000/) in the browser, then navigating to "Musings" page.

## 🐇 Jump around <!-- omit in toc -->

- [✨ Summary](#-summary)
- [👩‍💻 Tasks](#-tasks)
  - [Task 1: Integration testing](#task-1-integration-testing)
    - [🚀 Bonus task: Allows to delete a musing](#-bonus-task-allows-to-delete-a-musing)
    - [🚀 Bonus task: (TDD) Allows to search for musings](#-bonus-task-tdd-allows-to-search-for-musings)
  - [Task 2: Component unit testing](#task-2-component-unit-testing)
    - [🚀 Bonus task: Fires onClose when Escape is pressed](#-bonus-task-fires-onclose-when-escape-is-pressed)
    - [🚀 Bonus task: Implement a unit tests for `formatDate` utility function](#-bonus-task-implement-a-unit-tests-for-formatdate-utility-function)
  - [Task 3: e2e testing with Cypress](#task-3-e2e-testing-with-cypress)
- [📚 Materials](#-materials)


## ✨ Summary

- integration testing
- testing react hooks
- testing utilities
- TDD in real life
- (optional) Cypress e2e testing

## 👩‍💻 Tasks

### Task 1: Integration testing

In this task we will learn how to test react components in integration. In front-end application, we can consider test and integration tests if it is testing multiple units together. 

Head to `screens/MyMusings.test.jsx` and implement tests for `MyMusings` component. We have just implemented a test to check that the list is rendered. Write a new test that checks the logic of creating a new musing.

Test scenario:
1. First, wait until the existing list of items is displayed. 
2. Then, click on the "New musing" button. 
3. Then, wait until the dialog (role `dialog`) is displayed. 
4. Then, fill in the input (label: Write something) and click on the "Save" button. 
5. Then, wait until the dialog is closed (Tip: use `waitForElementToBeRemoved`).
6. Then, wait until the new item is displayed in the list.
7. Then, check that API has been called correctly

**💡 Tips:**
- In `test/mocks` you can already find mocks for the returned data, you can just use `mockMusing` to generate a mock
- You would need to mock 2 API calls, one for creating a new musing `mockApi.createMusing` and one for fetching the list of musings `mockApi.getMyMusings`

#### 🚀 Bonus task: Allows to delete a musing

If you finished with main task, you can try to implement a test for deleting a musing from the list.

Test scenario:
1. First, wait until the existing list of items is displayed. 
2. Then, find a musing you want to delete
3. Then, click on the "Delete" button within it to delete it (Tip: use `within` helper to find the item within the container)
4. Then, check that the item disappeared from the list
5. Then, check that API has been called correctly

**💡 Tips:**
- You can use `waitForElementToBeRemoved` to ensure the item was removed from the list 

**💡 Tips:**
- Error object can have a message inside that will be displayed to the user `error.message`, which can be mocked

#### 🚀 Bonus task: (TDD) Allows to search for musings

You can see there is a searchbox on the page, but it is not implemented yet. Implement a test that ensures that searchbox works correctly. Then, go back and implement the searching functionality until the test is green.

**💡 Tips:**
- Error object can have a message inside that will be displayed to the user `error.message`, which can be mocked

### Task 2: Component unit testing

In this task we will learn how to test react components in isolation. This can be useful for design system components you might have.
In the same fashion we tested `Musing` component white a set of tests for `Modal` component.

#### 🚀 Bonus task: Fires onClose when Escape is pressed

You can notice that Modal component closes when Escape is pressed. Let's write a test case to check that it works as expected.

#### 🚀 Bonus task: Implement a unit tests for `formatDate` utility function

In `helpers/formatDate.js` you can find a utility function `formatDate`, which formats dates that then are displayed on the musing card. Implement a unit test for this function.

To see the tests, run `npm test formatDate`

**Check that it:**
- formats date relatively if it is less than a day ago
- returns date in a format `MM/dd/yyyy` if it is more than a day ago

### Task 3: e2e testing with Cypress


## 📚 Materials

- [Cypress docs](https://www.cypress.io/)
- [Cypress testing library](https://testing-library.com/docs/cypress-testing-library/intro/)
