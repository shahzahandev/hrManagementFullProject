require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const { registrationController, loginController, logoutController } = require("./controllers/registrationControllers");
const { profileCreateController, getAllProfileController, singleEmployeeProfileController, updateProfileController, holdProfileController } = require("./controllers/profileCreateController");
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Database connected")
})

app.post("/registration", registrationController)
app.post("/login", loginController)
app.post("/logout", logoutController)

// employee profile create
app.post("/profile", profileCreateController)
app.get("/allData", getAllProfileController)
app.get("/singleProfile/:id", singleEmployeeProfileController)
app.post("/updateProfile/:id", updateProfileController)
app.post("/holdProfile", holdProfileController)



app.listen(port, ( ) => {
    console.log(`Server is running on port ${port}`);    
})
