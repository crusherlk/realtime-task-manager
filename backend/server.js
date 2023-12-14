const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMidWare");
const taskRoutes = require("./routes/taskRoutes");
const { protect } = require("./middleware/authMidWare");
const ObjectId = require("mongoose").Types.ObjectId;

const { Server } = require("socket.io");
const Task = require("./modals/task.modal");

dotenv.config();

const app = express();
connectDB();

app.use(express.json()); //accept JSON
app.use(cors()); // enable cors

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.use("/user", userRoutes);
app.use("/tasks", protect, taskRoutes);

// custom error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(5000, console.log(`Server started on port ${PORT}`));

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("newTask", (t) => {
    socket.broadcast.emit("recieve_newTask");
  });

  socket.on("editedTask", (t) => {
    socket.broadcast.emit("recieve_editedTask");
  });

  socket.on("deletedTask", (t) => {
    socket.broadcast.emit("recieve_deletedTask");
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
