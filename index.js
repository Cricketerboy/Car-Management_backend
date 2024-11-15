const express = require("express");
const dotenv = require("dotenv");
const databaseConnection = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const cors = require('cors');

dotenv.config();
databaseConnection();

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api", carRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
