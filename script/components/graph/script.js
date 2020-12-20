import Chart from 'chart.js';



async function getGraphData(country) {
  const url = `https://disease.sh/v3/covid-19/historical/${country || 'all'}?lastdays=360`;
  const response = await fetch(url);

  if (response.ok) {
    const commits = await response.json();
    console.log(commits);
    drawGraph(commits.cases ? commits.cases : commits.timeline.deaths, commits.country || 'All World');
  } else {
    alert(`Ошибка в функции getGraphData.The number of requests is limited. Please try again later. Error: ${response.status}`);
  }
}

function drawGraph(date, title) {
  document.querySelector('#myChart').parentNode.removeChild(document.querySelector('#myChart'));
  document.querySelector('.graph').insertAdjacentHTML('afterbegin', '<canvas id="myChart"></canvas>')
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(date),
      datasets: [{
        label: 'Cases',
        data: Object.values(date),
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
      title: {
        display: true,
        text: `${title}`,
        fontSize: 21,
      },
    },
  });
}

export { getGraphData };
