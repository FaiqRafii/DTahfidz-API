require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Connected To API With MongoDB");
});

const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const halaqohRouter = require("./routes/halaqoh");
const presensiRouter = require("./routes/presensi");
const santriRouter = require("./routes/santri");
const setoranRouter = require("./routes/setoran");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(4000);
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/halaqoh", halaqohRouter);
app.use("/presensi", presensiRouter);
app.use("/santri", santriRouter);
app.use("/setoran", setoranRouter);

module.exports.handler=async (event,context)=>{
  return app(event,contex)
}