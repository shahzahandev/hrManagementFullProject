require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const { mainControllers } = require("./controllers/mainControllers");
const app = express()
const port = process.env.PORT || 5000

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Database connected")
})

app.get("/main", mainControllers)

app.listen(8000, (req, res) => {
    console.log(`Server is running on port ${port}`);    
})
