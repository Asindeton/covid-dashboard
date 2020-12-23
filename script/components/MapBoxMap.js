// eslint-disable-next-line import/no-unresolved
import mapboxgl from 'mapbox-gl';
import {
  toGeoJSON, getMarkSize, getMapCenter, drawMapFunc,
} from '../utils/mapUtils';
import createHtmlElement from '../utils/create';
import { numberFormatter } from '../utils/formatter';

export default class MapBoxMap {
  constructor(state, data) {
    this.state = state;
    this.cases = state.cases;
    this.population = state.population;
    this.region = state.region;
    this.time = state.time;
    this.data = data;
    this.id = state.container || 'map';
  }

  renderMap() {
    this.geoJSON = toGeoJSON(this.data);
    this.mapCenter = getMapCenter(this.geoJSON, this.region);
    this.drawMap(this.mapCenter, this.id);
    this.drawMarker(this.geoJSON, this.cases, this.population, this.time);
    setTimeout(() => this.map.resize(), 300);
  }

  drawMap(center, mapContainerId) {
    this.map = drawMapFunc(center, mapContainerId);
    const layers = ['confirmed', 'lethal', 'recovered'];
    const colors = ['rgb(230, 70, 81)', 'black', '#24a319'];
    const legend = document.querySelector('#legend');
    legend.innerHTML = '';
    for (let i = 0; i < layers.length; i += 1) {
      const key = createHtmlElement('span', 'legend-key');
      key.style.backgroundColor = colors[i];
      const value = createHtmlElement('span');
      value.innerHTML = layers[i];
      legend.appendChild(createHtmlElement('div', '', [key, value]));
    }
  }

  drawMarker(date, val, population, time) {
    date.features.forEach((marker) => {
      const getNumber = (displayType, stateTime) => {
        switch (displayType) {
          case 'confirmed':
            return {
              numberCount: stateTime === 'allTime' ? marker.properties.cases : marker.properties.todayCases,
              displayTypeColor: 'rgb(230, 70, 81)',
            };
          case 'lethal':
            return {
              numberCount: stateTime === 'allTime' ? marker.properties.deaths : marker.properties.todayDeaths,
              displayTypeColor: 'black',
            };
          case 'recovered':
            return {
              numberCount: stateTime === 'allTime' ? marker.properties.recovered : marker.properties.todayRecovered,
              displayTypeColor: '#24a319',
            };
          default:
            throw new Error();
        }
      };
      const { numberCount, displayTypeColor } = getNumber(val, time);
      const mapMarker = this.createMarker(marker, displayTypeColor,
        numberFormatter(numberCount, population, marker.properties.population));
      new mapboxgl.Marker(mapMarker).setLngLat(marker.geometry.coordinates).addTo(this.map);
    });
  }

  createMarker(marker, markerColor, markerContent) {
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 25,
      className: 'custom-popup',
    });
    let updatedFormatted;
    if (marker.properties.updated) {
      updatedFormatted = new Date(marker.properties.updated).toLocaleString();
    }
    let casesString = `${Math.round(markerContent)}`;
    if (markerContent > 1000) {
      casesString = `${casesString.slice(0, -3)} k+`;
    }
    const {
      country, deaths, recovered, cases,
    } = marker.properties;
    const el = createHtmlElement('span', 'icon-marker');
    el.innerHTML = `${markerContent ? casesString : ''}`;
    el.style.width = `${markerContent ? getMarkSize(markerContent) : 0}px`;
    el.style.height = `${markerContent ? getMarkSize(markerContent) : 0}px`;
    el.style.backgroundColor = markerColor;
    el.addEventListener('mouseenter', () => {
      const description = `
        <span class = 'icon-marker-tooltip'>
        <h2>${country}</h2>
            <ul>
              <li><strong>Confirmed:</strong> ${cases}</li>
              <li><strong>Deaths:</strong> ${deaths}</li>
              <li><strong>Recovered:</strong> ${recovered}</li>
              <li><strong>Last Update:</strong> ${updatedFormatted}</li>
            </ul>
          </span>`;
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
      event.target.dispatchEvent(new CustomEvent('markerClick', {
        bubbles: true,
        detail: { country: marker.properties.country },
      }));
    });
    return el;
  }
}
