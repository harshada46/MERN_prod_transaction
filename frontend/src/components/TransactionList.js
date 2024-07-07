// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const TransactionList = () => {
// //   const [search, setSearch] = useState('');
// //   const [transactions, setTransactions] = useState([]);
// //   const [showResults, setShowResults] = useState(false);

// //   const fetchTransactions = async () => {
// //     try {
// //       const response = await axios.get(`http://localhost:5000/api/transactions?search=${search}`);
// //       setTransactions(response.data);
// //       setShowResults(true);
// //     } catch (error) {
// //       console.error('Failed to fetch transactions:', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Transaction List</h1>
// //       <input
// //         type="text"
// //         placeholder="Search..."
// //         value={search}
// //         onChange={(e) => setSearch(e.target.value)}
// //       />
// //       <button onClick={fetchTransactions}>Search</button>
// //       {showResults && (
// //         <table>
// //           <thead>
// //             <tr>
// //               <th>ID</th>
// //               <th>Title</th>
// //               <th>Description</th>
// //               <th>Price</th>
// //               {/* Add more table headers as needed */}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {transactions.map(transaction => (
// //               <tr key={transaction.id}>
// //                 <td>{transaction.id}</td>
// //                 <td>{transaction.title}</td>
// //                 <td>{transaction.description}</td>
// //                 <td>{transaction.price}</td>
// //                 {/* Add more table data cells as needed */}
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // export default TransactionList;

// import React, { useState } from "react";
// import axios from "axios";
// import "../style.css"; // Import CSS file for styling

// const TransactionList = () => {
//   const [search, setSearch] = useState("");
//   const [transactions, setTransactions] = useState([]);
//   const [showResults, setShowResults] = useState(false);

//   const fetchTransactions = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/transactions?search=${search}`
//       );
//       setTransactions(response.data);
//       setShowResults(true);
//     } catch (error) {
//       console.error("Failed to fetch transactions:", error);
//     }
//   };

//   //   return (
//   //     <div className="tab_container">
//   //       <h1 className="tab_title">Transaction List</h1>
//   //       <input
//   //         type="text"
//   //         placeholder="Search..."
//   //         value={search}
//   //         onChange={(e) => setSearch(e.target.value)}
//   //         className="tab_input"
//   //       />
//   //       <button onClick={fetchTransactions} className="tab_button">Search</button>
//   //       {showResults && (
//   //         <table className="tab_table">
//   //           <thead>
//   //             <tr>
//   //               <th className="tab_header">ID</th>
//   //               <th className="tab_header">Title</th>
//   //               <th className="tab_header">Description</th>
//   //               <th className="tab_header">Price</th>
//   //               {/* Add more table headers as needed */}
//   //             </tr>
//   //           </thead>
//   //           <tbody>
//   //             {transactions.map(transaction => (
//   //               <tr key={transaction.id}>
//   //                 <td className="tab_data">{transaction.id}</td>
//   //                 <td className="tab_data">{transaction.title}</td>
//   //                 <td className="tab_data">{transaction.description}</td>
//   //                 <td className="tab_data">{transaction.price}</td>
//   //                 {/* Add more table data cells as needed */}
//   //               </tr>
//   //             ))}
//   //           </tbody>
//   //         </table>
//   //       )}
//   //     </div>
//   //   );
//   // };

//   // TransactionList.js

//   // return (
//   //   <div className="tab_container">
//   //     <h1 className="tab_title">Transaction List</h1>
//   //     <div className="tab_search-container">
//   //       <input
//   //         type="text"
//   //         placeholder="Search..."
//   //         value={search}
//   //         onChange={(e) => setSearch(e.target.value)}
//   //         className="tab_input"
//   //       />
//   //       <button onClick={fetchTransactions} className="tab_button">
//   //         Search
//   //       </button>
//   //     </div>
//   //     {showResults && (
//   //       <table className="tab_table">
//   //         <thead>
//   //           <tr>
//   //             <th className="tab_header">ID</th>
//   //             <th className="tab_header">Title</th>
//   //             <th className="tab_header">Description</th>
//   //             <th className="tab_header">Price</th>
//   //             <th className="tab_header">Image</th> {/* New header for image */}
//   //             {/* Add more table headers as needed */}
//   //           </tr>
//   //         </thead>
//   //         <tbody>
//   //           {transactions.map((transaction) => (
//   //             <tr key={transaction.id}>
//   //               <td className="tab_data">{transaction.id}</td>
//   //               <td className="tab_data">{transaction.title}</td>
//   //               <td className="tab_data">{transaction.description}</td>
//   //               <td className="tab_data">{transaction.price}</td>
//   //               <td className="tab_data">
//   //                 {/* Display image */}
//   //                 <img src={transaction.image} alt="Transaction" style={{ maxWidth: '100px', maxHeight: '100px' }} />
//   //               </td>
//   //               {/* Add more table data cells as needed */}
//   //             </tr>
//   //           ))}
//   //         </tbody>
//   //       </table>
//   //     )}
//   //   </div>
//   // );





//   return (
//     <div className="tab_container">
//       <h1 className="tab_title">Transaction List</h1>
//       <div className="tab_search-container">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="tab_input"
//         />
//         <button onClick={fetchTransactions} className="tab_button">
//           Search
//         </button>
//       </div>
//       {showResults && (
//         <table className="tab_table">
//           <thead>
//             <tr>
//               <th className="tab_header">ID</th>
//               <th className="tab_header">Title</th>
//               <th className="tab_header">Description</th>
//               <th className="tab_header">Price</th>
//               <th className="tab_header">Image</th>
//               {/* Add more table headers as needed */}
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((transaction, index) => {
//               if (index === 0) {
//                 return (
//                   <tr key={transaction.id}>
//                     <td className="tab_data">{transaction.id}</td>
//                     <td className="tab_data">{transaction.title}</td>
//                     <td className="tab_data">{transaction.description}</td>
//                     <td className="tab_data">{transaction.price}</td>
//                     <td className="tab_data">
//                       <img src={transaction.image} alt="Transaction" className="tab_image" />
//                     </td>
//                     {/* Add more table data cells as needed */}
//                   </tr>
//                 );
//               } else {
//                 const prevTransaction = transactions[index - 1];
//                 const isDifferent = (
//                   transaction.id !== prevTransaction.id ||
//                   transaction.title !== prevTransaction.title ||
//                   transaction.description !== prevTransaction.description ||
//                   transaction.price !== prevTransaction.price ||
//                   transaction.image !== prevTransaction.image
//                 );
//                 if (isDifferent) {
//                   return (
//                     <tr key={transaction.id}>
//                       <td className="tab_data">{transaction.id}</td>
//                       <td className="tab_data">{transaction.title}</td>
//                       <td className="tab_data">{transaction.description}</td>
//                       <td className="tab_data">{transaction.price}</td>
//                       <td className="tab_data">
//                         <img src={transaction.image} alt="Transaction" className="tab_image"/>
//                       </td>
//                       {/* Add more table data cells as needed */}
//                     </tr>
//                   );
//                 } else {
//                   return null; // Don't render the row if it's the same as the previous one
//                 }
//               }
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
  
  





// };

// export default TransactionList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style.css"; // Import CSS file for styling

const TransactionList = () => {
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fullDescription, setFullDescription] = useState({});

  useEffect(() => {
    if (search.trim() === "") {
      setShowResults(false); // Hide results if search is empty
    } else {
      fetchTransactions();
    }
  }, [currentPage, search]); // Fetch transactions when currentPage or search changes

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/transactions?search=${search}&page=${currentPage}`
      );
      setTransactions(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page when performing a new search
    fetchTransactions();
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleViewFullDescription = (id) => {
    setFullDescription((prevFullDescription) => ({
      ...prevFullDescription,
      [id]: true,
    }));
  };

  const uniqueTransactions = () => {
    const uniqueRecords = new Set();
    const uniqueTransactions = [];
    transactions.forEach((transaction) => {
      const { id, title, description, price, image } = transaction;
      const recordKey = `${id}_${title}_${description}_${price}_${image}`;
      if (!uniqueRecords.has(recordKey)) {
        uniqueRecords.add(recordKey);
        uniqueTransactions.push(transaction);
      }
    });
    return uniqueTransactions;
  };

  return (
    <div className="tab_container">
      <h1 className="tab_title">Transaction List</h1>
      <div className="tab_search-container">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="tab_input"
        />
        <button onClick={handleSearch} className="tab_button">
          Search
        </button>
      </div>
      {showResults && (
        <div>
          <table className="tab_table">
            <thead>
              <tr>
                <th className="tab_header">ID</th>
                <th className="tab_header">Title</th>
                <th className="tab_header">Description</th>
                <th className="tab_header">Price</th>
                <th className="tab_header">Image</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {uniqueTransactions().map((transaction) => (
                <tr key={transaction.id}>
                  <td className="tab_data">{transaction.id}</td>
                  <td className="tab_data">{transaction.title}</td>
                  <td className="tab_data">
                    {fullDescription[transaction.id] ? (
                      transaction.description
                    ) : (
                      <>
                        {transaction.description.slice(0, 150)}
                        {transaction.description.length > 150 && (
                          <div className="tab_view-full-container">

                          <button
                            onClick={() =>
                              handleViewFullDescription(transaction.id)
                            }
                            className="tab_view-full-button"
                          >
                            View Full Text
                          </button>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                  <td className="tab_data">{transaction.price}</td>
                  <td className="tab_data">
                    <img
                      src={transaction.image}
                      alt="Transaction"
                      className="tab_image"
                    />
                  </td>
                  {/* Add more table data cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-buttons">
            <button onClick={handlePrevious} className="tab_prev-button">
              Previous
            </button>
            <button onClick={handleNext} className="tab_next-button">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;

