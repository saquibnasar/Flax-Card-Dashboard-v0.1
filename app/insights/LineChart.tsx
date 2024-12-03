import { Chart, ChartConfiguration } from "chart.js/auto";
import { useEffect, useRef } from "react";

interface ChartRef {
  chart?: Chart;
}

interface Props {
  borderColor: string;
}

const LineChart = ({ borderColor }: Props) => {
  const chartRef = useRef<HTMLCanvasElement & ChartRef>(null);
  useEffect(() => {
    let chartInstance: Chart | null = null;
    const createChart = () => {
      if (chartRef.current) {
        const context = chartRef.current.getContext("2d");
        if (context) {
          if (chartInstance) {
            chartInstance.destroy();
          }

          //   backgroundColor: ["rgb(255, 99, 132, 0.2)"],
          //   borderColor: ["rgb(255, 99, 132)"],

          const chartConfig: ChartConfiguration<"line"> = {
            type: "line",
            data: {
              labels: [
                "Oct-1",
                "Oct-2",
                "Oct-3",
                "Oct-4",
                "Oct-5",
                "Oct-6",
                "Oct-7",
                "Oct-8",
              ],
              datasets: [
                {
                  label: "Leads Generated",
                  data: [12, 334, 56, 56, 7, 78],
                  borderColor: [borderColor],
                  fill: false,
                  cubicInterpolationMode: "monotone",
                  tension: 0.4,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                title: {
                  display: true,
                },
              },
              interaction: {
                intersect: false,
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                  },
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: "Value",
                  },
                  suggestedMin: -10,
                  suggestedMax: 200,
                },
              },
            },
          };

          chartInstance = new Chart(context, chartConfig);
        }
      }
    };

    createChart();

    return () => {
      if (chartInstance) {
        if (chartInstance?.destroy) {
          chartInstance.destroy();
        }
      }
    };
  }, []);

  return <canvas className="w-full h-full" ref={chartRef} />;
  // return <Line data={}/>
};

export default LineChart;
