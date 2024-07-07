// // server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const axios = require("axios");
// const Product = require("./models/Product");

// const app = express();
// const PORT = 5000;

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://127.0.0.1/test", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// app.use(express.json());

// // Define route to initialize database with seed data
// app.get("/api/initialize", async (req, res) => {
//   try {
//     // Fetch data from third-party API
//     const response = await axios.get(
//       "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
//     );
//     const products = response.data;

//     // res.json(products);
//     // Insert seed data into database
//     await Product.insertMany(products);

//     res.status(200).json({ message: "Database initialized with seed data." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to initialize database." });
//   }
// });

// // Start server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");

// Allow requests from your frontend domain

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    // Call function to fetch data from third-party API and initialize database
    initializeDatabase();
  })
  .catch((err) => console.log(err));

// Define MongoDB schema and model for transactions
const transactionSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// Function to fetch data from third-party API and initialize database
async function initializeDatabase() {
  try {
    // Fetch data from third-party API
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const products = response.data;

    // Insert seed data into database
    await Transaction.insertMany(products);

    console.log("Database initialized with seed data.");
    // console.log(products)
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
}

app.get("/api/alltransactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();

    // Send the fetched transactions as the response
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

// API endpoint to list all transactions with search and pagination

app.get("/api/transactions", async (req, res) => {
  try {
    const { search = "",page=1, perPage=10 } = req.query;

    // Define search criteria
    // const searchCriteria = {
    //   $or: [
    //     { title: { $regex: search, $options: "i" } }, // Case-insensitive search on title
    //     { description: { $regex: search, $options: "i" } }, // Case-insensitive search on description
    //     { price: { $eq: parseFloat(search) } }, // Match exact price
    //   ],
    // };



    const searchCriteria = {
      $or: [
        { title: { $regex: search, $options: "i" } }, // Case-insensitive search on title
        { description: { $regex: search, $options: "i" } }, // Case-insensitive search on description
        { price: isNaN(parseFloat(search)) ? undefined : parseFloat(search) }, // Match exact price if numerical input, otherwise ignore
      ].filter(Boolean), // Filter out undefined values
    };

    // Fetch transactions based on search criteria and pagination
    const transactions = await Transaction.find(searchCriteria)
    .skip((page - 1) * perPage)
    .limit(parseInt(perPage));

    res.json(transactions);
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

// app.get("/api/transactions", async (req, res) => {
//   try {
//     const { search = "" } = req.query;

//     // Define search criteria
//     const searchCriteria = {
//       $or: [
//           { title: { $regex: search, $options: "i" } }, // Case-insensitive search on title
//           { description: { $regex: search, $options: "i" } }, // Case-insensitive search on description
//           { price: { $eq: parseFloat(search) } }, // Match exact price
//       ],
//     };

//     // Fetch transactions based on search criteria and pagination
//     const transactions = await Transaction.find(searchCriteria);

//     res.json(transactions);
//   } catch (error) {
//     console.error("Failed to fetch transactions:", error);
//     res.status(500).json({ message: "Failed to fetch transactions" });
//   }
// });

// API endpoint for statistics
// app.get("/api/statistics", async (req, res) => {
//   try {
//     const { selectedMonth } = req.query;
//     const selectedDate = new Date(selectedMonth);

//     // Extract year and month from selectedDate
//     const year = selectedDate.getFullYear();
//     const month = selectedDate.getMonth();

//     // Calculate statistics
//     const totalSaleAmount = await Transaction.aggregate([
//       {
//         $match: {
//           $expr: {
//             $and: [
//               { $eq: [{ $year: { $toDate: "$dateOfSale" } }, year] },
//               { $eq: [{ $month: { $toDate: "$dateOfSale" } }, month + 1] }, // MongoDB months are 0-indexed
//               { $eq: ["$sold", true] },
//             ],
//           },
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalAmount: { $sum: "$price" },
//         },
//       },
//     ]);

//     const totalSoldItems = await Transaction.countDocuments({
//       $expr: {
//         $and: [
//           { $eq: [{ $year: { $toDate: "$dateOfSale" } }, year] },
//           { $eq: [{ $month: { $toDate: "$dateOfSale" } }, month + 1] }, // MongoDB months are 0-indexed
//           { $eq: ["$sold", true] },
//         ],
//       },
//     });

//     const totalUnsoldItems = await Transaction.countDocuments({
//       $expr: {
//         $and: [
//           { $eq: [{ $year: { $toDate: "$dateOfSale" } }, year] },
//           { $eq: [{ $month: { $toDate: "$dateOfSale" } }, month + 1] }, // MongoDB months are 0-indexed
//           { $eq: ["$sold", false] },
//         ],
//       },
//     });

//     res.json({
//       totalSaleAmount:
//         totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
//       totalSoldItems,
//       totalUnsoldItems,
//     });
//   } catch (error) {
//     console.error("Failed to fetch statistics:", error);
//     res.status(500).json({ message: "Failed to fetch statistics" });
//   }
// });



app.get("/api/statistics", async (req, res) => {
  try {
    const { selectedMonth } = req.query;
    const month = parseInt(selectedMonth); // Extract the month from the selectedMonth query parameter

    // Calculate statistics
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $month: { $toDate: "$dateOfSale" } }, month] }, // Ignore the year part
              { $eq: ["$sold", true] }
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" }
        }
      }
    ]);

    const totalSoldItems = await Transaction.countDocuments({
      $expr: {
        $and: [
          { $eq: [{ $month: { $toDate: "$dateOfSale" } }, month] }, // Ignore the year part
          { $eq: ["$sold", true] }
        ]
      }
    });

    const totalUnsoldItems = await Transaction.countDocuments({
      $expr: {
        $and: [
          { $eq: [{ $month: { $toDate: "$dateOfSale" } }, month] }, // Ignore the year part
          { $eq: ["$sold", false] }
        ]
      }
    });

    res.json({
      totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems,
      totalUnsoldItems
    });
  } catch (error) {
    console.error("Failed to fetch statistics:", error);
    res.status(500).json({ message: "Failed to fetch statistics" });
  }
});








// // API endpoint for bar chart
// app.get("/api/bar-chart", async (req, res) => {
//   try {
//     const { selectedMonth } = req.query;
//     const selectedDate = new Date(selectedMonth);

//     // Extract month and create start and end dates for the selected month
//     const month = selectedDate.getMonth();
//     const startOfMonth = new Date(selectedDate.getFullYear(), month, 1);
//     const endOfMonth = new Date(
//       selectedDate.getFullYear(),
//       month + 1,
//       0,
//       23,
//       59,
//       59
//     );

//     // Define price ranges
//     const priceRanges = [
//       { min: 0, max: 100 },
//       { min: 101, max: 200 },
//       { min: 201, max: 300 },
//       { min: 301, max: 400 },
//       { min: 401, max: 500 },
//       { min: 501, max: 600 },
//       { min: 601, max: 700 },
//       { min: 701, max: 800 },
//       { min: 801, max: 900 },
//       { min: 901, max: Infinity },
//     ];

//     // Initialize an object to store the count of items in each price range
//     const priceRangeCounts = {};
//     for (const range of priceRanges) {
//       priceRangeCounts[
//         `${range.min}-${range.max === Infinity ? "above" : range.max}`
//       ] = 0;
//     }

//     // Fetch transactions for the selected month
//     const transactions = await Transaction.find({
//       dateOfSale: {
//         $gte: startOfMonth,
//         $lte: endOfMonth,
//       },
//     });

//     // Count the number of items in each price range
//     transactions.forEach((transaction) => {
//       const price = transaction.price;
//       for (const range of priceRanges) {
//         if (price >= range.min && price <= range.max) {
//           priceRangeCounts[
//             `${range.min}-${range.max === Infinity ? "above" : range.max}`
//           ]++;
//           break;
//         }
//       }
//     });

//     // Format the response
//     const formattedResponse = [];
//     for (const range of priceRanges) {
//       formattedResponse.push({
//         range: `${range.min}-${range.max === Infinity ? "above" : range.max}`,
//         count:
//           priceRangeCounts[
//             `${range.min}-${range.max === Infinity ? "above" : range.max}`
//           ],
//       });
//     }

//     res.json(formattedResponse);
//   } catch (error) {
//     console.error("Failed to fetch bar chart data:", error);
//     res.status(500).json({ message: "Failed to fetch bar chart data" });
//   }
// });


// const PORT = 5000; // Use the environment variable PORT if available, otherwise default to port 3000



// API endpoint for bar chart
app.get("/api/bar-chart", async (req, res) => {
  try {
    const { selectedMonth } = req.query;
    const month = parseInt(selectedMonth); // Extract the month from the selectedMonth query parameter

    // Define price ranges
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    // Initialize an object to store the count of items in each price range
    const priceRangeCounts = {};
    for (const range of priceRanges) {
      priceRangeCounts[`${range.min}-${range.max === Infinity ? "above" : range.max}`] = 0;
    }

    // Fetch transactions for the selected month regardless of the year
    const transactions = await Transaction.find({
      $expr: {
        $eq: [{ $month: { $toDate: "$dateOfSale" } }, month] // Match the month only
      }
    });

    // Count the number of items in each price range
    transactions.forEach((transaction) => {
      const price = transaction.price;
      for (const range of priceRanges) {
        if (price >= range.min && price <= range.max) {
          priceRangeCounts[`${range.min}-${range.max === Infinity ? "above" : range.max}`]++;
          break;
        }
      }
    });

    // Format the response
    const formattedResponse = [];
    for (const range of priceRanges) {
      formattedResponse.push({
        range: `${range.min}-${range.max === Infinity ? "above" : range.max}`,
        count: priceRangeCounts[`${range.min}-${range.max === Infinity ? "above" : range.max}`],
      });
    }

    res.json(formattedResponse);
  } catch (error) {
    console.error("Failed to fetch bar chart data:", error);
    res.status(500).json({ message: "Failed to fetch bar chart data" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});