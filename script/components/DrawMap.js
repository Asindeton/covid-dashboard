import {
  toGeoJSON, getMarkSize, getMapCenter, drawMapFunc,
} from '../utils/mapUtils';
import createHtmlElement from '../utils/create';
// import Graph from './graph/script';

export default class DrawMap {
  constructor(state, data) {
    this.state = state;
    this.cases = state.cases;
    this.population = state.population;
    this.region = state.region;
    this.time = state.time;
    this.data = data;
    this.id = state.container || 'map';
  }

  async getMapData() {
    this.geoJSON = toGeoJSON(this.data);

    this.mapCenter = getMapCenter(this.geoJSON, this.region);
    this.drawMap(this.mapCenter, this.id);
    this.drawMarker(this.geoJSON, this.cases, this.population, this.time, this.region);
  }

  drawMap(center, DOMElement) {
    this.map = drawMapFunc(center, DOMElement);
    this.map.addControl(new mapboxgl.NavigationControl());

    const layers = ['confirmed', 'lethal', 'recovered'];
    const colors = ['rgb(230, 70, 81)', 'black', '#24a319'];
    const legend = document.querySelector('#legend');
    legend.innerHTML = '';
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];
      const color = colors[i];
      const item = document.createElement('div');
      const key = document.createElement('span');
      key.className = 'legend-key';
      key.style.backgroundColor = color;

      const value = document.createElement('span');
      value.innerHTML = layer;
      item.appendChild(key);
      item.appendChild(value);
      legend.appendChild(item);
    }
  }

  drawMarker(date, val, population, time, region) {
    date.features.forEach((marker) => {
      let updatedFormatted;
      let casesString;
      const {
        country, deaths, recovered, cases,
      } = marker.properties;
      let markerContent;
      let markerColor;

      if (val === 'confirmed') {
        if (time === 'allTime') {
          markerContent = population === 'absolute' ? marker.properties.cases : (marker.properties.cases / marker.properties.population) * 100000;
        } else {
          markerContent = population === 'absolute' ? marker.properties.todayCases : (marker.properties.todayCases / marker.properties.population) * 100000;
        }
        markerColor = 'rgb(230, 70, 81)';
      } else if (val === 'lethal') {
        if (time === 'allTime') {
          markerContent = population === 'absolute' ? marker.properties.deaths : (marker.properties.deaths / marker.properties.population) * 100000;
        } else {
          markerContent = population === 'absolute' ? marker.properties.todayDeaths : (marker.properties.todayDeaths / marker.properties.population) * 100000;
        }
        markerColor = 'black';
      } else if (val === 'recovered') {
        if (time === 'allTime') {
          markerContent = population === 'absolute' ? marker.properties.recovered : (marker.properties.recovered / marker.properties.population) * 100000;
        } else {
          markerContent = population === 'absolute' ? marker.properties.todayRecovered : (marker.properties.todayRecovered / marker.properties.population) * 100000;
        }
        markerColor = '#24a319';
      }

      const countryShortCode = marker.properties.countryInfo.iso3;
      // country === region ? new Graph(this.state).getGraphData(countryShortCode) : false;
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 25,
        className: 'custom-popup',
      });

      if (marker.properties.updated) {
        updatedFormatted = new Date(marker.properties.updated).toLocaleString();
      }
      casesString = `${Math.round(markerContent)}`;
      if (markerContent > 1000) {
        casesString = `${casesString.slice(0, -3)}k+`;
      }
      const description = `
        <span class = 'icon-marker-tooltip'>
        <h2>${country}</h2>
            <ul>
              <li><strong>Confirmed:</strong> ${cases}</li>
              <li><strong>Deaths:</strong> ${deaths}</li>
              <li><strong>Recovered:</strong> ${recovered}</li>
              <li><strong>Last Update:</strong> ${updatedFormatted}</li>
            </ul>
          </span>
        `;
      const el = createHtmlElement('span', 'icon-marker');
      el.innerHTML = `${markerContent ? casesString : ''}`;
      el.style.width = `${markerContent ? getMarkSize(markerContent) : 0}px`;
      el.style.height = `${markerContent ? getMarkSize(markerContent) : 0}px`;
      el.style.backgroundColor = markerColor;
      el.addEventListener('mouseenter', () => {
        popup.setLngLat(marker.geometry.coordinates).setHTML(description).addTo(this.map);
      });

      el.addEventListener('mouseleave', () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });
      el.addEventListener('click', (event) => {
        this.map.flyTo({
          center: marker.geometry.coordinates,
        });
        //  new Graph(this.state).getGraphData(countryShortCode);
        event.target.dispatchEvent(new CustomEvent('markerClick', {
          bubbles: true,
          detail: { country: marker.properties.country },
        }));
      });
      // add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map);
    });
  }

  getMapContainer() {
    return `
        <div id='mapWrapper' class="full-height">
          <div class="inside-wrapper full-height" id="${this.id}"></div>
          <div class="map-overlay" id="legend"></div>
        </div>
    `;
  }
}
