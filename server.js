const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Connected To API");
});

const userRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const registerRouter=require("./routes/register")
const halaqohRouter=require("./routes/halaqoh")
const presensiRouter=require("./routes/presensi")
const santriRouter=require("./routes/santri")
const setoranRouter=require('./routes/setoran')

app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/register",registerRouter)
app.use("/halaqoh",halaqohRouter)
app.use("/presensi",presensiRouter)
app.use("/santri",santriRouter)
app.use('/setoran',setoranRouter)

app.listen(4000);
