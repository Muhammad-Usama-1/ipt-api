const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!  🔥 Shutting down..");
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

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

const io = new Server(server, {
  cors: {
    origin: "https://glittery-crostata-66e711.netlify.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    // data.sender = false;
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

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
