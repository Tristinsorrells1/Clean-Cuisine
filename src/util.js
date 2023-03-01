export const cleanData = (results) => {
  return results.map((data) => {
    return {
      inspection_id: data["inspection_id"],
      dba_name: data["dba_name"],
      license: data["license_"],
      risk: data.risk,
      address: data.address,
      city: data["city"].toLowerCase(),
      state: data.state,
      zip: data.zip,
      inspection_date: reformatDate(data["inspection_date"]),
      results: data.results,
      violations: data.violations || "No Violations",
      latitude: data.latitude,
      longitude: data.longitude
    };
  })
}

export const reformatDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
}