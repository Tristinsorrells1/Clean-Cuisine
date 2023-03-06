describe("Results Error Handling", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json?zip=60607&$limit=8000",
      },
      {
        statusCode: 200,
        body: [],
      }
    );

    cy.visit("http://localhost:3000");
  });

  it("Should inform the user if no results are found", () => {
   cy.get("input").eq(0).type("60607");
   cy.get("input").eq(1).type("deli");
   cy.get("button").click();

   cy.get("p").eq(1).should("contain", "No Matches")
  });
});
