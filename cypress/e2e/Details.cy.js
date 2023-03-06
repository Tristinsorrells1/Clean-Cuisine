import stubbedResults from "../fixtures/stubbedResults";

describe("Details", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json?zip=60607&$limit=8000",
      },
      {
        statusCode: 200,
        body: stubbedResults,
      }
    );

    cy.visit("http://localhost:3000");
     cy.get("input").eq(0).type("60607");
     cy.get("input").eq(1).type("deli");
     cy.get("button").click();
     cy.get("div[class='result-card']").eq(0).click();
  });

  it("Should display the site title and logo", () => {
    cy.get("h1").should("contain", "Clean Cuisine");
    cy.get("img[class='stars-icon']").should("be.visible");
  });

  it("Should display the restaurant's name and address", () => {
    cy.get("h2").should("contain", "Erik's Deli");
    cy.get("p[class='street']").should("contain", "525 W Van Buren St");
    cy.get("p[class='city']").should("contain", "Chicago, IL");
    cy.get("p[class='zip']").should("contain", "60607");
  });

  it("Should display the restaurant's location on a google map", () => {
    cy.get("iframe").should("be.visible");
    cy.get("[aria-label='Map']").should("be.visible");
    cy.get("div > a")
      .should("have.attr", "href")
      .should(
        "eq",
        "https://maps.google.com/maps?ll=41.876647,-87.640695&z=15&t=m&hl=en-US&gl=US&mapclient=apiv3"
      );
  });

it("Should open google maps when a user clicks on the directions button", () => {
  cy.intercept("GET", "https://www.google.com/maps/dir/*").as(
    "googleMaps"
  );

  cy.get("button[class='directions-button']").click();

  cy.wait("@googleMaps").then((intercept) => {
    expect(intercept.response.statusCode).to.eq(200);
    expect(intercept.request.url).to.eq(
      "https://www.google.com/maps/dir/?api=1&destination=Erik%27s+Deli%2CChicago%2CIL"
    );
  });
})

  it("Should display the inspection results", () => {
    cy.get("div[class='inspection-results-header']").should("contain", "Inspection Results");
    cy.get("p[class='date']").should("contain", "Date of Inspection: 10/4/2021");
    cy.get("span").should("contain", "Risk 1 (High)");
    cy.get("img[class='info-icon']").should("have.attr", "src").should("eq", "../../../Assets/info-icon.png");
    cy.get("div[class='result']").should("contain", "Fail");
    cy.get("img[class='fail-icon']").should("have.attr", "src").should("eq", "../../../Assets/x-mark.png");
  })

  it("Should display the violatons if a restaurant recieved any", () => {
    cy.get("div[class='violation-header']").should("contain", "Violations");
    cy.get("p[class='violation-comment']").eq(0).should("contain", "38. Insects, Rodents, & Animals Not Present");
    cy.get("p[class='violation-comment']")
      .eq(1)
      .should(
        "contain",
        "Found A Gap In Between And At The Bottom Of The Front Double Doors. Must Seal Gaps To Prevent Pest Entry And Maintain."
      );
  });

  it("Should have a button that takes the user back to the results", () => {
    cy.get("button[class='back-button']").click();
    cy.get("div[class='result-card']").should("have.length", 3);
  });
});
