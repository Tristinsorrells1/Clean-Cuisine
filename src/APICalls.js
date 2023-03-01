const getRestaurants = (zipcode, name) => {
  const params = new URLSearchParams();
  if (zipcode) {
    params.append('zip', zipcode);
  }
  // if (name) {
  //   params.append('dba_name', name);
  // }
  const url = `https:data.cityofchicago.org/resource/4ijn-s7e5.json?${params.toString()}`
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(`API Error!`));
};

export default getRestaurants;

// 60632 
// 60607