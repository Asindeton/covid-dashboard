import Chart from 'chart.js';
import DashboardItem from './DashboardItem';
import { numberFormatter } from '../../utils/formatter';

export default class GlobalChartItem extends DashboardItem {
  constructor(itemContainerSelector, fullScreenSelector, state, data, clickHandler) {
    super(itemContainerSelector, fullScreenSelector, state, data, clickHandler);
    this.initialEl = itemContainerSelector;
    this.isDrawable = true;
  }

  updateItemInfo(data, state) {
    super.updateItemInfo(data, state);
    this.getGraphData(this.state.region);
  }

  async getGraphData(country) {
    const url = `https://disease.sh/v3/covid-19/historical/${country || 'all'}?lastdays=360`;
    const response = await fetch(url);
    if (response.ok) {
      const commits = await response.json();
      let { population } = this.data.Global;
      if (country) {
        population = this.data.filter((el) => el.country === country);
        population = population[0].population;
      }
      this.title = commits.country || 'All World';
      if (this.state.cases === 'confirmed') {
        this.color = 'rgb(230, 70, 81)';
        this.legend = 'Confirmed';
        this.chartData = commits.cases ? commits.cases : commits.timeline.cases;
      } else if (this.state.cases === 'lethal') {
        this.color = 'black';
        this.legend = 'Lethal';
        this.chartData = commits.deaths ? commits.deaths : commits.timeline.deaths;
      } else if (this.state.cases === 'recovered') {
        this.color = '#24a319';
        this.legend = 'Recovered';
        this.chartData = commits.recovered ? commits.recovered : commits.timeline.recovered;
      }
      Object.entries(this.chartData).forEach(([key, value]) => {
        this.chartData[key] = numberFormatter(value, this.state.population, population);
      });
      this.drawElement(this.itemContainer);
    } else {
      // eslint-disable-next-line no-alert
      alert(`Sorry, there is no chart data for this country. Error: ${response.status}`);
    }
  }

  removeElement() {
    if (this.itemContainer.querySelector('.inside-wrapper')) this.itemContainer.querySelectorAll('.inside-wrapper').forEach((el) => el.remove());
  }

  getInitialElement() {
    return this.initialEl;
  }

  drawElement(container = this.itemContainer) {
    this.removeElement();
    this.itemContainer = container;
    this.insideWrapper = document.createElement('div');
    this.canvas = document.createElement('canvas');
    this.insideWrapper.classList.add('inside-wrapper');
    this.insideWrapper.classList.add('full-height');
    this.insideWrapper.append(this.canvas);
    container.prepend(this.insideWrapper);
    const ctx = this.canvas.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(this.chartData),
        datasets: [{
          label: `${this.legend}`,
          data: Object.values(this.chartData),
          borderWidth: 1,
          backgroundColor: this.color,
          xAxisID: '',
        }],
      },
      options: {},
    });
    myChart.options = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback(value) {
              let answer = '';
              if (value >= 1000000) {
                answer = `${(value / 1000000).toFixed(1)}M`;
              } else if (value >= 1000) {
                answer = `${(value / 1000)}k`;
              } else {
                answer = `${value}`;
              }
              return answer;
            },
          },
        }],
      },
      title: {
        display: true,
        text: `${this.title}`,
        fontSize: 21,
      },
    };
  }
}
