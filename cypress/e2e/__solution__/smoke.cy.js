describe("smoke", () => {
  it("allows sign up, create a note, delete and sign out", () => {
    cy.visit("/app");

    // sign in
    cy.findByRole("button", { name: /sign up/i }).click();

    cy.findByRole("dialog").within(() => {
      cy.findByLabelText(/email/i).type(`${Math.random()}@test.com`);
      cy.findByLabelText(/password/i).type("qwert123456");
      cy.findByRole("button", { name: /create account/i }).click();
    });

    // empty state
    cy.findByText(/you do not have any musings yet/i).should("exist");

    // create musing

    // check it was created

    // delete

    // sign out
  });
});
