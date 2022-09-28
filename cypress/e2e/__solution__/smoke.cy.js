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
    cy.findByRole("button", { name: /new musing/i }).click();
    cy.findByRole("dialog").within(() => {
      cy.findByLabelText(/write something/i).type("Hello world");
      cy.findByRole("button", { name: /save/i }).click();
    });

    // 4. Check it was created
    const musing = cy.findByTestId("musing");
    musing.should("exist");

    // 5. Delete musing
    musing.within(() => {
      cy.findByRole("button", { name: /delete/i }).click();
    });

    cy.findByText("musing").should("not.exist");
    cy.findByText(/you do not have any musings yet/i).should("exist");

    // 6. Sign out
    cy.findByRole("button", { name: /sign out/i }).click();
    cy.findByRole("heading", { name: /you need to log in/i }).should("exist");
  });
});
