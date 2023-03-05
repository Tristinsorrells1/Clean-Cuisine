import stubbedResults from "../fixtures/stubbedResults";
import getRestaurants from "../../src/APICalls"

describe("Home", () => {
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
      // cy.intercept(
      //   {
      //     method: "GET",
      //     url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json?zip=60607&$limit=10000&$offset=10000",
      //   },
      //   {
      //     statusCode: 200,
      //     body: [],
      //   }
      // );

    cy.visit("http://localhost:3000");
    
  });

  it("Should display the site title and logo", () => {
    cy.get("h1").should("contain", "Clean Cuisine")
    cy.get("img[class='stars-icon']").should("be.visible")
  });

  it("Should tell the user to search for a restaurant by its name and zipcode", () => {
    cy.get("p").should(
      "contain","Search for a Restaurant in Chicago by Name and Zipcode");
  });

  it("Should allow the user to enter input for the name and zipcode and then click the search button to see results", () => {
    cy.get("input").eq(0).should("be.visible");
    cy.get("input").eq(0).type("60607")
    cy.get("input").eq(1).should("be.visible");
    cy.get("input").eq(1).type("deli");
    cy.get("button").click()
  });



});
