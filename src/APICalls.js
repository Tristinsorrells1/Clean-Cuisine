export const getRestaurants = async (zipcode) => {
  const url = `https://data.cityofchicago.org/resource/4ijn-s7e5.json?zip=${zipcode}&$limit=8000`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log("response not okay", response);
      return
    }
    else {
      return response.json()
    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return error.message
  }
};
