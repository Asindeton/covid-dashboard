// import Chart from 'chart.js';

// export default class Graph {
//   constructor(state, data) {
//     this.cases = state.cases;
//     this.population = state.population;
//     this.region = state.region;
//     this.time = state.time;
//     this.data = data;
//     this.id = state.container || 'map';
//   }

//   async getGraphData(country) {
//     const url = `https://disease.sh/v3/covid-19/historical/${country || 'all'}?lastdays=360`;
//     const response = await fetch(url);
//     if (response.ok) {
//       const commits = await response.json();
//       if (this.cases === 'confirmed') {
//         this.drawGraph(commits.cases ? commits.cases : commits.timeline.cases, commits.country || 'All World', 'rgb(230, 70, 81)','confirmed');
//       } else if (this.cases === 'lethal') {
//         this.drawGraph(commits.cases ? commits.cases : commits.timeline.deaths, commits.country || 'All World', 'black','lethal');
//       } else if (this.cases === 'recovered') {
//         this.drawGraph(commits.cases ? commits.cases : commits.timeline.recovered, commits.country || 'All World', '#24a319','recovered');
//       }
//     } else {
//       alert(`Sorry, there is no data for this country. Error: ${response.status}`);
//     }
//   }

//   drawGraph(date, title, color, legend) {
//     document.querySelector('#myChart').parentNode.removeChild(document.querySelector('#myChart'));
//     document.querySelector('.graph').insertAdjacentHTML('afterbegin', '<canvas id="myChart"></canvas>')
//     const ctx = document.getElementById('myChart').getContext('2d');
//     const myChart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: Object.keys(date),
//         datasets: [{
//           label: `${legend}`,
//           data: Object.values(date),
//           borderWidth: 1,
//           backgroundColor: color,
//           xAxisID: '',
//         }],
//       },
//       options: {
//         scales: {
//           yAxes: [{
//             ticks: {
//               beginAtZero: true,
//               // Include a dollar sign in the ticks
//               callback: function(value, index, values) {
//                 /* if(value>1000000){
//                   val
//                 } */
//                 return  value/10000;
//             }
//             },
//           }],
//         },
//         title: {
//           display: false,
//           text: `${title}`,
//           fontSize: 21,
//         },
//       },
//     });
//   }
// }
