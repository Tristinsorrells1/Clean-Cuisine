import stubbedResults from "../fixtures/stubbedResults";

describe("Loading Spinner", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json?zip=60607&$limit=8000",
      },
      {
        statusCode: 200,
        delay: 9000,
        body: stubbedResults,
      }
    );

    cy.visit("http://localhost:3000");
  });

  it("Should display a loading spinner", () => {
    cy.get("input").eq(0).type("60607");
    cy.get("input").eq(1).type("deli");
    cy.get("button").click();

    cy.get("img[class='loading-spinner']").should("be.visible")
    cy.get("img[class='loading-spinner']")
      .should("have.attr", "src")
      .should("eq", "/assets/Spinner.gif");
  });
});
