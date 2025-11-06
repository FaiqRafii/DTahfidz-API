require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const halaqohRouter = require("./routes/halaqoh");
const presensiRouter = require("./routes/presensi");
const santriRouter = require("./routes/santri");
const setoranRouter = require("./routes/setoran");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  bufferCommands: false,
};

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL, options);
    console.log("Connected to MongoDB");

    // Register routers only after successful connection
    app.use("/login", loginRouter);
    app.use("/register", registerRouter);
    app.use("/halaqoh", halaqohRouter);
    app.use("/presensi", presensiRouter);
    app.use("/santri", santriRouter);
    app.use("/setoran", setoranRouter);

    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();

app.get("/", (req, res) => {
  res.send("Server is running with MongoDB");
});

module.exports = app;
