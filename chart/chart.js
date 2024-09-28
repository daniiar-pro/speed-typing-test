import { getMetricsData } from "../storage/storage.js";

let metricsChartInstance = null;
export function loadMetricsFromStorage() {
  const metricsData = getMetricsData();
  if (metricsData.length > 0) {
    displayMetricsChart();
  }
}

export function displayMetricsChart() {
  const metricsData = getMetricsData();
  const wpmData = metricsData.map((data, index) => ({
    x: index + 1,
    y: data.wpm,
  }));
  const accuracyData = metricsData.map((data, index) => ({
    x: index + 1,
    y: data.accuracy,
  }));

  const ctx = document.getElementById("metrics-chart").getContext("2d");

  if (metricsChartInstance) {
    metricsChartInstance.destroy();
  }

  metricsChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "WPM",
          data: wpmData,
          borderColor: "blue",
          fill: false,
        },
        {
          label: "Accuracy (%)",
          data: accuracyData,
          borderColor: "green",
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: {
            display: true,
            text: "Attempt",
          },
        },
        y: {
          title: {
            display: true,
            text: "Value",
          },
          min: 0,
        },
      },
    },
  });
}
