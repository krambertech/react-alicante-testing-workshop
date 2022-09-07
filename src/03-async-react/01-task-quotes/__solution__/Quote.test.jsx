// 👉 TASK: Write tests for Quote component
// Make sure to cover special cases, decide yourself 
// on which cases you will split it
// 
// Run your tests with:
//   npm test Quote

import { render } from "@testing-library/react";
import Quote from "../Quote";

jest.mock("./api");

test("ypur first test", () => {
  render(<Quote />);
  
  // 👉 Implement me!
});

// 💡 TIPS:
//
// How to work with <select> elements, look into `useEvent.selectOptions`
// https://testing-library.com/docs/ecosystem-user-event/#selectoptionselement-values-options
//
// Good luck! 🍀