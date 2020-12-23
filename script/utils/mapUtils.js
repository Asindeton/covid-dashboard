import mapboxgl from 'mapbox-gl';

function toGeoJSON(dataArr) {
  const geoJSON = {
    type: 'FeatureCollection',
    features: [
    ],
  };
  dataArr.forEach((data) => {
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

function getMapCenter(json, country) {
  const countryArr = [];
  const locationArr = [];
  json.features.forEach((e) => {
    countryArr.push(e.properties.country);
    locationArr.push(e.geometry.coordinates);
  });
  return locationArr[countryArr.indexOf(country)];
}

function drawMapFunc(center, mapContainerId) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYXNpbmRldG9uIiwiYSI6ImNrM3l5eG1oYjBkNTAzbXAzb3N0OWVkcngifQ.9-7d9OiVIiV5KWubQm1KOQ';
  return new mapboxgl.Map({
    container: mapContainerId || 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 5,
    center: center || [27.559154, 53.900600],
  });
}

export {
  toGeoJSON, getMarkSize, getMapCenter, drawMapFunc,
};
