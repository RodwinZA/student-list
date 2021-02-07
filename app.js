const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
const PORT = process.env.PORT || 3000;

const Student = require("./models/Student.js");

// Establish connection with MongoDB Compass
mongoose.connect("mongodb://localhost/students", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    const students = await Student.find({});
    res.render("index", {students});
});

app.post("/newstudent", async (req, res) => {
    await Student.create(req.body);
    console.log(req.body);
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});