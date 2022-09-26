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
    cy.findByRole("button", { name: /new musing/i }).click();
    cy.findByRole("dialog").within(() => {
      cy.findByLabelText(/write something/i).type("Hello world");
      cy.findByRole("button", { name: /save/i }).click();
    });

    // check it was created
    const musing = cy.findByTestId("musing");
    musing.should("exist");

    // delete
    musing.within(() => {
      cy.findByRole("button", { name: /delete/i }).click();
    });

    cy.findByText("musing").should("not.exist");
    cy.findByText(/you do not have any musings yet/i).should("exist");

    // sign out
    cy.findByRole("button", { name: /sign out/i }).click();
    cy.findByRole("heading", { name: /you need to log in/i }).should("exist");
  });
});
