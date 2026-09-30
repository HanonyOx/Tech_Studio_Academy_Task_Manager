import { register, login } from "../controllers/authController.js";
import express from "express";
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());

app.post("/auth/register", register);
app.post("/auth/login", login);

