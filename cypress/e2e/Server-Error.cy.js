describe("Server Error", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json?zip=60607&$limit=8000",
      },
      {
        statusCode: 500,
      }
    );

    cy.visit("http://localhost:3000");
  });

  it("Should inform the user of server errors", () => {
    cy.get("input").eq(0).type("60607");
    cy.get("input").eq(1).type("deli");
    cy.get("button").click();

     cy.get("div[class='error-container']").should("be.visible");
     cy.get("p").eq(1).should("contain", "We are having server issues, please try again later");
     cy.get("p").eq(2).should("contain", "Error: Internal Server Error");
  });
});
