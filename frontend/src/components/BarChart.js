// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import Chart from 'chart.js/auto';
// const BarChart = () => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/bar-chart", {
//         params: {
//           selectedMonth: 1 // Pass the selected month here, e.g., 1 for January
//         }
//       });
//       setChartData(response.data);
//     } catch (error) {
//       console.error("Failed to fetch bar chart data:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Bar Chart</h2>
//       {chartData && (
//         <Bar
//           data={{
//             labels: chartData.map((item) => item.range),
//             datasets: [
//               {
//                 label: "Count",
//                 data: chartData.map((item) => item.count),
//                 backgroundColor: "rgba(75,192,192,1)",
//                 borderColor: "rgba(0,0,0,1)",
//                 borderWidth: 1
//               }
//             ]
//           }}
//           options={{
//             title: {
//               display: true,
//               text: "Bar Chart",
//               fontSize: 20
//             },
//             legend: {
//               display: true,
//               position: "right"
//             },
//             scales: {
//               yAxes: [
//                 {
//                   ticks: {
//                     beginAtZero: true
//                   }
//                 }
//               ]
//             }
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default BarChart;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const BarChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedMonth]); // Add selectedMonth as a dependency to re-fetch data when it changes

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bar-chart", {
        params: {
          selectedMonth: selectedMonth, // Pass the selected month
        },
      });
      setChartData(response.data);
    } catch (error) {
      console.error("Failed to fetch bar chart data:", error);
    }
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      {chartData && (
        <Bar
          data={{
            labels: chartData.map((item) => item.range),
            datasets: [
              {
                label: "Count",
                data: chartData.map((item) => item.count),
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            title: {
              display: true,
              text: "Bar Chart",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      )}
    </div>
  );
};

export default BarChart;
