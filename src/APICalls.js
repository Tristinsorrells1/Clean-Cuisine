export const getRestaurants = async (zipcode) => {
  const limit = 10000;
  let offset = 0;
  let results;
  let allResults = [];

  while (true) {
    const url = `https://data.cityofchicago.org/resource/4ijn-s7e5.json?zip=${zipcode}&$limit=${limit}&$offset=${offset}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log("response not okay", response);
        break;
      }
      results = await response.json();
      if (results.length === 0) {
        break;
      }
      allResults = allResults.concat(results);
      offset += limit;
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
      return error.message
    }
  }
  console.log(allResults)
  return allResults;
};
