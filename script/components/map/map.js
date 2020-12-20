function drawMap(center, DOMElement) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYXNpbmRldG9uIiwiYSI6ImNrM3l5eG1oYjBkNTAzbXAzb3N0OWVkcngifQ.9-7d9OiVIiV5KWubQm1KOQ';
  return new mapboxgl.Map({
    container: DOMElement?DOMElement:'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 5,
    center: center?center:[27.559154, 53.900600],
  });
}

export { drawMap };
