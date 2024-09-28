
export function saveMetrics(metrics) {
    let metricsData = JSON.parse(localStorage.getItem('metricsData')) || [];
    metricsData.push(metrics);
    localStorage.setItem('metricsData', JSON.stringify(metricsData));
  }
  
  export function getMetricsData() {
    return JSON.parse(localStorage.getItem('metricsData')) || [];
  }
  
  export function clearMetricsData() {
    localStorage.removeItem('metricsData');
  }
  