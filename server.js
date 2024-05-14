const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const hpp = require("hpp");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const userRoute = require("./routes/userRoute");
const AppEror = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const postRoute = require("./routes/postRoute");
const msgRoute = require("./routes/messageRoute");
// 100 request for same ip in 1 hour
const limiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per `window` (here, per 60 minutes)
  windowMs: 60 * 60 * 1000, // 60 minutes
  message: "Too many request with this IP please try again in an hour",
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!  🔥 Shutting down..");
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: "./config.env" });
// const app = require("./app");

// const DB = process.env.DATABASE_LOCAL;
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
const DBLocal = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connectd in EVN -->", process.env.NODE_ENV));

const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// there is ...
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(
  cors({
    credentials: true,
    origin: ["https://social-mern.netlify.app/"],
    origin: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "PATCH"],
  })
);
const PORT = process.env.PORT || 3000


app.set("trust proxy", 1);
app.use(express.static(path.join(__dirname, "public")));
// Global Middlewares
// Set Security HTTP header
app.use(helmet());
app.use("/api", limiter);
// );
// Body Parser (basicaly reading data from body in req.body)
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
// Data sanitization against nosql query injection ,
app.use(mongoSanitize());
// Data sanitization against xss ,
app.use(xss());
// Prevent parameter pollution
// By using whitelist option allow only duration to be double in query
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "ratingsQantity",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);
// Development Login
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.get("/is-ready", (req, res) => {
  res.send("API is Ready for consuming!!");
});


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//Routes go here
app.all('*', (req,res) => {
    res.json({"every thing":"is awesome"})
})

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})


process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION!  🔥 Shutting down..");
  server.close(() => {
    process.exit(1);
  });
});
process.on("SIGTERM", (err) => {
  console.log(err.name, err.message);
  console.log("SIGTERM RECIVED!  🔥 Shutting down.. gracefully");
  server.close(() => {
    console.log("Process terminating..");
  });
});
