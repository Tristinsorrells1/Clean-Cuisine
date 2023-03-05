describe("Page Not Found Error", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should inform the user if they navigate to a page not found", () => {
   cy.visit("http://localhost:3000/hi");

   cy.get("section[class='error-section']").should("be.visible");
   cy.get("p").eq(0).should("contain", "404 Error");
   cy.get("p").eq(1).should("contain", "Page Not Found");
  });

  it("Should have a button to redirect the user back to the home page", () => {
    cy.visit("http://localhost:3000/hi");

    cy.get("button[class='back-button']").should("be.visible");

    cy.get("button[class='back-button']").click();

    cy.get("section[class='home-section']").should("be.visible");
  });
});
