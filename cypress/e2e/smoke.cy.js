/**
 * 👉 TASK: e2e testing with Cypress
 *
 * Let's practice in testing our application with Cypress! Beginning of the
 * test is already written for you, but you need to complete the rest of the
 * test.
 *
 * Follow comments to see what you need to test.
 *
 * To run cypress test:
 * > npm run cypress:open
 */
describe("smoke", () => {
  it("allows sign up, create a note, delete and sign out", () => {
    cy.visit("/app");

    // 1. Sign up
    cy.findByRole("button", { name: /sign up/i }).click();

    cy.findByRole("dialog").within(() => {
      cy.findByLabelText(/email/i).type(`${Math.random()}@test.com`);
      cy.findByLabelText(/password/i).type("qwert123456");
      cy.findByRole("button", { name: /create account/i }).click();
    });

    // 2. Check Empty state
    cy.findByText(/you do not have any musings yet/i).should("exist");

    // 3. Create musing

    // 4. Check it was created

    // 5. Delete musing

    // 6. Sign out
  });
});
