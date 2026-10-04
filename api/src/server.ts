import express, { type Application } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";

import tasksRoutes from "./routes/tasksRoutes.js"
import authRoutes from "./routes/authRoutes.js";

const app: Application = express();
connectDB();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/tasks", tasksRoutes)

app.use("/auth", authRoutes);



app.get("/", (req, res) => {
  res.send("Hello from my express server");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
