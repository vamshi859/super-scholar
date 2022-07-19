import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import boardRoute from "./routes/boards.js";
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", boardRoute);
const PORT = 5001;

const CONNECTION_URL =
  "mongodb+srv://vamshi_gujjuboina:vamshi@stack-overflow-clone.x62as.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((err) => console.log(err.message));

export default app;
