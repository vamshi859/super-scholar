import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import boardRoute from "./routes/boards.js";
import authRoute from "./routes/auth.js";
import passport from "passport";
import local from "./strategies/local.js";
import dotenv from "dotenv";
// const store = new session.MemoryStore();
const app = express();
dotenv.config();
// app.use(session({
//   secret: 'vamshi',
//   cookie: {maxAge: 30000},
//   saveUninitialized: false,
//   store
// }))
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use(passport.initialize());
// pass(passport)

// app.use(passport.session());

app.use("/", boardRoute);
app.use("/auth",authRoute);
const PORT = process.env.PORT;

const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((err) => console.log(err.message));

export default app;
