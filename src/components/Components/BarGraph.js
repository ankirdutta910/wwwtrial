import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

function BarGraph({ countData }) {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current && countData) {
      const labels = Object.keys(countData);
      const data = Object.values(countData);

      const ctx = chartContainer.current.getContext("2d");

      if (chartInstance) {
        chartInstance.destroy();
      }

      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Count",
              data: data,
              backgroundColor: "#fc5417",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [countData]);

  return <canvas ref={chartContainer} />;
}

export default BarGraph;
