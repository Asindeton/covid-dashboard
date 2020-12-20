function toGeoJSON(dataArr) {
  console.log(dataArr);
  const geoJSON = {
    type: 'FeatureCollection',
    features: [

    ],
  };
  dataArr.map((data) => {
    geoJSON.features.push({
      type: 'Feature',
      properties: {
        country: data.country,
        countryInfo: { ...data.countryInfo },
        cases: data.cases,
        updated: data.updated,
        deaths: data.deaths,
        recovered: data.recovered,
        todayCases: data.todayCases,
        todayDeaths: data.todayDeaths,
        todayRecovered: data.todayRecovered,
        population: data.population,
      },
      geometry: {
        type: 'Point',
        coordinates: [data.countryInfo.long, data.countryInfo.lat],
      },
    });
  });
  return geoJSON;
}

function getMarkSize(cases) {
  return cases ** (1 / 4) < 40 ? cases ** (1 / 4) + 25 : cases ** (1 / 4);
}

function getCountryArr(json) {
  const arr = [];
  json.features.map((e) => arr.push(e.properties.country));
  return arr;
}

function getLocationArr(json) {
  const arr = [];
  json.features.map((e) => arr.push(e.geometry.coordinates));
  return arr;
}

function getMapCenter(json, country) {
  const countryArr = [];
  const locationArr = [];
  json.features.map((e) => {
    countryArr.push(e.properties.country);
    locationArr.push(e.geometry.coordinates);
  });

  return locationArr[countryArr.indexOf(country)];
}

export {
  toGeoJSON, getMarkSize, getMapCenter,
};
