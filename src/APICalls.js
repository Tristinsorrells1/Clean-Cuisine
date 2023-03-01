const getRestaurants = (zipcode) => {
  return fetch(
    `https:data.cityofchicago.org/resource/4ijn-s7e5.json?zip=${zipcode}`
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(`API Error!`));
};

export default getRestaurants;

// 60632 
// 60607