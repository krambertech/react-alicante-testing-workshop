// 👉 TASK: Write tests for Quote component
// Make sure to cover special cases, decide yourself 
// on which cases you will split it
// 
// Run your tests with:
//   npm test Quote

import { render } from "@testing-library/react";
import Quote from "./Quote";

test("your first test", () => {
  render(<Quote />);
  
  // 👉 Implement me!
});

// 💡 TIPS:
//
// How to work with <select> elements, look into `useEvent.selectOptions`
// https://testing-library.com/docs/ecosystem-user-event/#selectoptionselement-values-options
//
// To test async requests when content was displayed, you wan wait for oading indication to be removed:
// https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved
//
// You would need to mock API the same way we did in the Welcome message example
//
// Good luck! 🍀