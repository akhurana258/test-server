const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const userRoute = require("./userRoute");
app.use(express.static(path.join(__dirname, "/uploads")));
const mongoUrl = 'mongodb://127.0.0.1/TestUser';
app.use(cors());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
mongoose.connect(mongoUrl, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.once("error", console.error.bind("error"))
app.use("/user", userRoute);
app.listen(4000,()=>{
    console.log("Server started at 4000");
})
