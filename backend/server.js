const PORT = process.env.PORT || 1111;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

// Route import
import recipes from "./routes/recipes.js";

// Load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(cors());
app.use(express.json());


// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routes
app.use("/api/recipes", recipes);
app.use("/images", express.static("images"));


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
})

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
