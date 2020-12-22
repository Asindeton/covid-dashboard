import Chart from 'chart.js';
import DashboardItem from './DashboardItem';

export default class GlobalChartItem extends DashboardItem {
  constructor(itemContainerSelector, fullScreenSelector, state, data, clickHandler) {
    super(itemContainerSelector, fullScreenSelector, state, data, clickHandler);
    this.initialEl = itemContainerSelector;
    this.isDrawable = true;
  }

  updateItemInfo(data, state) {
    super.updateItemInfo(data, state);
    this.removeElement();
    this.getGraphData(this.state.region);
  }

  async getGraphData(country) {
    const url = `https://disease.sh/v3/covid-19/historical/${country || 'all'}?lastdays=360`;
    const response = await fetch(url);
    if (response.ok) {
      const commits = await response.json();
      this.title = commits.country || 'All World';
      if (this.state.cases === 'confirmed') {
        this.color = 'rgb(230, 70, 81)';
        this.legend = 'confirmed';
        this.chartData = commits.cases ? commits.cases : commits.timeline.cases;
      } else if (this.state.cases === 'lethal') {
        this.color = 'black';
        this.legend = 'lethal';
        this.chartData = commits.cases ? commits.cases : commits.timeline.deaths;
      } else if (this.state.cases === 'recovered') {
        this.color = '#24a319';
        this.legend = 'recovered';
        this.chartData = commits.cases ? commits.cases : commits.timeline.recovered;
      }
      this.drawElement(this.itemContainer);
    } else {
      alert(`Sorry, there is no data for this country. Error: ${response.status}`);
    }
  }

  removeElement() {
    if (this.itemContainer.querySelector('.inside-wrapper')) this.itemContainer.querySelector('.inside-wrapper').remove();
  }

  getInitialElement() {
    return this.initialEl;
  }

  drawElement(container = this.itemContainer) {
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
      options: {
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
              // Include a dollar sign in the ticks
              callback(value) {
                let answer = '';
                if (value > 1000) {
                  answer = `${Math.ceil(value / 1000)}k`;
                } if (value > 1000000) {
                  answer = `${Math.ceil(value / 1000000)} M`;
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
      },
    });
  }
}