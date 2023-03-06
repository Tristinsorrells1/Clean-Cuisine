import stubbedResults from "../fixtures/stubbedResults";

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
   
    cy.visit("http://localhost:3000");
    
  });

  it("Should display the site title and logo", () => {
    cy.get("h1").should("contain", "Clean Cuisine Chi")
    cy.get("img[class='stars-icon']").should("be.visible")
  });

  it("Should tell the user to search for a restaurant by its name and zipcode", () => {
    cy.get("p").should("contain","Search for a Restaurant in Chicago by Name and Zipcode");
  });

  it("Should allow the user to enter input for the name and zipcode and then click the search button to see results", () => {
    cy.get("input").eq(0).should("be.visible");
    cy.get("input").eq(0).type("60607")
    cy.get("input").eq(1).should("be.visible");
    cy.get("input").eq(1).type("deli");
    cy.get("button").click()
    cy.get("div[class='result-card']").should("have.length", 3)
  });

  it("Should display the name and inspection result for each restaurant", () => {
    cy.get("input").eq(0).type("60607");
    cy.get("input").eq(1).type("deli");
    cy.get("button").click();

    cy.get("p[class='card-name']").eq(0).should("contain", "Erik's Deli");
    cy.get("p[class='card-result']").eq(0).should("contain", "Fail");
    cy.get("img").eq(1).should("have.attr", "src").should("eq", "../../../Assets/x-mark.png");

    cy.get("p[class='card-name']").eq(1).should("contain", "Fresh Eats Deli");
    cy.get("p[class='card-result']").eq(1).should("contain", "Pass");
    cy.get("img").eq(2).should("have.attr", "src").should("eq", "../../../Assets/check.png");

    cy.get("p[class='card-name']").eq(2).should("contain", "Delight");
    cy.get("p[class='card-result']").eq(2).should("contain", "Not Ready");
    cy.get("img").eq(3).should("have.attr", "src").should("eq", "../../../Assets/warning.png");
  });

  it("Should let the user filter results and only display restaurants that passed", () => {
    cy.get("input").eq(0).type("60607");
    cy.get("input").eq(1).type("deli");
    cy.get("button").click();

    cy.get("select[id='filterResults']").select(1)
    cy.get("input[class='filter-button']").click()

    cy.get("div[class='result-card']").should("have.length", 1);
    cy.get("p[class='card-name']").eq(0).should("contain", "Fresh Eats Deli");
    cy.get("p[class='card-result']").eq(0).should("contain", "Pass");
    cy.get("img").eq(1).should("have.attr", "src").should("eq", "../../../Assets/check.png");
  });

  it("Should let the user filter results and only display restaurants that failed", () => {
    cy.get("input").eq(0).type("60607");
    cy.get("input").eq(1).type("deli");
    cy.get("button").click();

    cy.get("select[id='filterResults']").select(2);
    cy.get("input[class='filter-button']").click();

    cy.get("div[class='result-card']").should("have.length", 1);
    cy.get("p[class='card-name']").eq(0).should("contain", "Erik's Deli");
    cy.get("p[class='card-result']").eq(0).should("contain", "Fail");
    cy.get("img").eq(1).should("have.attr", "src").should("eq", "../../../Assets/x-mark.png");
  });

  it("Should tell the user to enter a valid zipcode if they try to search without one", () => {
    cy.get("input").eq(1).type("deli");
    cy.get("button").click();

    cy.get("div[class='error-container']").should("be.visible")
    cy.get("p").eq(1).should("contain", "Error - Invalid Zipcode")
    cy.get("p").eq(2).should("contain", "Please Enter a Valid Zipcode"); 
  });

  it("Should tell the user to enter a valid zipcode if they try to enter an invalid one", () => {
    cy.get("input").eq(1).type("deli");
    cy.get("input").eq(0).type("606070");
    cy.get("button").click();

    cy.get("div[class='error-container']").should("be.visible");
    cy.get("p").eq(1).should("contain", "Error - Invalid Zipcode");
    cy.get("p").eq(2).should("contain", "Please Enter a Valid Zipcode");
  });

  it("Should tell the user to enter a name input if they try to search without one", () => {
    cy.get("input").eq(0).type("60607");
    cy.get("button").click();

    cy.get("div[class='error-container']").should("be.visible");
    cy.get("p").eq(1).should("contain", "Error - Missing Inputs");
    cy.get("p").eq(2).should("contain", "Please Enter At Least One Character to Search");
  });

  it("Should redirect the user to a restaurant's page when they click on one", () => {
    cy.get("input").eq(0).type("60607");
    cy.get("input").eq(1).type("deli");
    cy.get("button").click();

    cy.get("div[class='result-card']").eq(0).click();

    cy.get("section[class='details-section']").should("be.visible");
  });
});