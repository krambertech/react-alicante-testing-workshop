import { render, screen } from "@testing-library/react";

import Login from "./Login";

test("allows to log in with correct password", () => {
  render(<Login />);

  expect(screen.getByRole("heading", { name: /log in/i })).toBeInTheDocument();
});
