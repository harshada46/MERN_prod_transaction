// import React, { useState } from "react";
// import "../style.css"; // Import your CSS file
// import axios from "axios"; // Import Axios for making HTTP requests
// import BarChart from "./BarChart"; // Import the BarChart component

// function App() {
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [statistics, setStatistics] = useState(null);
//   const [showBarChart, setShowBarChart] = useState(false); // State to track whether to show the bar chart
//   const [showStatistics, setShowStatistics] = useState(false); // State to track whether to show the statistics

//   const handleMonthChange = (e) => {
//     setSelectedMonth(e.target.value);
//     setShowBarChart(false); // Hide the bar chart when a new month is selected
//     setShowStatistics(false); // Hide the statistics when a new month is selected
//   };

//   const fetchStatistics = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/statistics?selectedMonth=${selectedMonth}`
//       );
//       setStatistics(response.data);
//       setShowBarChart(true); // Set the state to show the bar chart after fetching statistics
//       setShowStatistics(true); // Set the state to show the statistics after fetching statistics
//     } catch (error) {
//       console.error("Failed to fetch statistics:", error);
//     }
//   };

//   return (
//     <div className="stats_container">
//       <h1 className="stats_title">Statistics</h1>
//       <div className="stats_form-group">
//         <label htmlFor="stats_selectedMonth" className="stats_label">
//           Select Month:
//         </label>
//         <select
//           id="stats_selectedMonth"
//           value={selectedMonth}
//           onChange={handleMonthChange}
//           className="stats_select"
//         >
//           <option value="" className="stats_option">
//             Select Month
//           </option>
//           <option value="01" className="stats_option">
//             January
//           </option>
//           <option value="02" className="stats_option">
//             February
//           </option>
//           {/* Add options for other months */}
//         </select>
//         <button onClick={fetchStatistics} className="stats_button">
//           Fetch Statistics
//         </button>
//       </div>
//       {showBarChart && <BarChart selectedMonth={selectedMonth} />}
//       {showStatistics && statistics && (
//         <div className="stats_statistics">
//           <p>
//             Total Sale Amount:{" "}
//             <span className="stats_value">
//               {/* Display the total sale amount for the selected month */}
//               ${statistics.totalSaleAmount}
//             </span>
//           </p>
//           <p>
//             Total Sold Items:{" "}
//             <span className="stats_value">{statistics.totalSoldItems}</span>
//           </p>
//           <p>
//             Total Unsold Items:{" "}
//             <span className="stats_value">{statistics.totalUnsoldItems}</span>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import "../style.css"; // Import your CSS file
import axios from "axios"; // Import Axios for making HTTP requests
import BarChart from "./BarChart"; // Import the BarChart component

function App() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [statistics, setStatistics] = useState(null);
  const [showBarChart, setShowBarChart] = useState(false); // State to track whether to show the bar chart
  const [showStatistics, setShowStatistics] = useState(false); // State to track whether to show the statistics

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  useEffect(() => {
    if (selectedMonth) {
      fetchStatistics();
    }
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/statistics?selectedMonth=${selectedMonth}`
      );
      setStatistics(response.data);
      setShowBarChart(true); // Set the state to show the bar chart after fetching statistics
      setShowStatistics(true); // Set the state to show the statistics after fetching statistics
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
    }
  };

  return (
    <div className="stats_container">
      <h1 className="stats_title">Statistics</h1>
      <div className="stats_form-group">
        <label htmlFor="stats_selectedMonth" className="stats_label">
          Select Month:
        </label>
        <select
          id="stats_selectedMonth"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="stats_select"
        >
          <option value="" className="stats_option">
            Select Month
          </option>
          <option value="01" className="stats_option">
            January
          </option>
          <option value="02" className="stats_option">
            February
          </option>
          <option value="03" className="stats_option">
            March
          </option>
          <option value="04" className="stats_option">
            April
          </option>
          <option value="05" className="stats_option">
            May
          </option>
          <option value="06" className="stats_option">
            June
          </option>
          <option value="07" className="stats_option">
            July
          </option>
          <option value="08" className="stats_option">
            August
          </option>
          <option value="09" className="stats_option">
            September
          </option>
          <option value="10" className="stats_option">
            October
          </option>
          <option value="11" className="stats_option">
            November
          </option>
          <option value="12" className="stats_option">
            December
          </option>
          {/* Add options for other months */}
        </select>
      </div>
      {showBarChart && <BarChart selectedMonth={selectedMonth} />}
      {showStatistics && statistics && (
        <div className="stats_statistics">
          <p>
            Total Sale Amount:{" "}
            <span className="stats_value">
              {/* Display the total sale amount for the selected month */}$
              {statistics.totalSaleAmount}
            </span>
          </p>
          <p>
            Total Sold Items:{" "}
            <span className="stats_value">{statistics.totalSoldItems}</span>
          </p>
          <p>
            Total Unsold Items:{" "}
            <span className="stats_value">{statistics.totalUnsoldItems}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
