import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import boardRoute from "./routes/boards.js";
import authRoute from "./routes/auth.js";
import passport from "passport";
import local from "./strategies/local.js";
// const store = new session.MemoryStore();
const app = express();
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
const PORT = 5001;

const CONNECTION_URL =
  "mongodb+srv://vamshi:vamshi@cluster0.q5u15.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((err) => console.log(err.message));

export default app;
