export const reformatDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
}

export const removeAllCaps = (name) => {
  return name
    .split(" ")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
    .join(" ");
}

export const removeDuplicates = (results) => {
  let restaurantLicenses = results.reduce((accum, result) => {
    if (!accum.includes(result["license_"])) {
      accum.push(result["license_"]);
    }
    return accum;
  }, []);

  return restaurantLicenses.reduce((accum, license) => {
    let licenseMatch = results.find((restaurant) => restaurant["license_"] === license)
    accum.push(licenseMatch)
   
    return accum;
  }, []);
}

export const cleanData = (results) => {
  results = results.filter((restaurant) => restaurant.results !== "Out of Business");

  return results.map((data) => {
    return {
      inspection_id: data["inspection_id"],
      name: removeAllCaps(data["dba_name"]),
      license: data["license_"],
      risk: data.risk,
      address: removeAllCaps(data.address),
      city: removeAllCaps(data["city"]),
      state: data.state,
      zip: data.zip,
      date: reformatDate(data["inspection_date"]),
      result: data.results,
      violations: data.violations || "No Violations",
      latitude: data.latitude,
      longitude: data.longitude,
    };
  });
};