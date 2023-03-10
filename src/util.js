export const reformatDate = (date) => {
  const newDate = new Date(date);
  return `${
    newDate.getMonth() + 1
  }/${newDate.getDate()}/${newDate.getFullYear()}`;
};

export const removeAllCaps = (name) => {
  if (!name) {
    return "No Documented Violations";
  }
  return name
    .split(" ")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
    .join(" ");
};

export const removeDuplicates = (results) => {
  let restaurantLicenses = results.reduce((accum, result) => {
    if (!accum.includes(result["license_"])) {
      accum.push(result["license_"]);
    }
    return accum;
  }, []);

  return restaurantLicenses.reduce((accum, license) => {
    let licenseMatch = results.find(
      (restaurant) => restaurant["license_"] === license
    );
    accum.push(licenseMatch);

    return accum;
  }, []);
};

export const cleanData = (results) => {
  results = results.filter(
    (restaurant) => restaurant.results !== "Out of Business"
  );

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
      violations: removeAllCaps(data.violations),
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      urlName: removeAllCaps(data["dba_name"]).replaceAll(" ", "+"),
      urlCity: removeAllCaps(data["city"])
    };
  });
};

export const formatViolations = (restaurant) => {
  let comments;
  if (restaurant && restaurant.violations !== "No Documented Violations") {
    comments = restaurant.violations.split("- Comments:").join("|").split("|");
    return comments.map((comment) => {
      return (
        <p key={comment} className="violation-comment">
          {comment}
        </p>
      );
    });
  } else if (restaurant) {
    return <p className="violation-comment">{restaurant.violations}</p>;
  }
};
