require("dotenv").config()
const express = require("express");
const { registrationController, loginController, logoutController } = require("./controllers/registrationControllers");
const { profileCreateController, getAllProfileController, singleEmployeeProfileController, updateProfileController, holdProfileController, allProfileWithOutHold, deleteProfile } = require("./controllers/profileCreateController");
const dbConnection = require("./config/dbConection");
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())

dbConnection()
//<==== Registration, Login, Logout =====>
app.post("/registration", registrationController)
app.post("/login", loginController)
app.post("/logout", logoutController)

// <==== Create profile, Get all profile, Get single profile, Update profile, Hold profile, Delete profile, Get all profile without hold. ====>
app.post("/profile", profileCreateController)
app.get("/allData", getAllProfileController)
app.get("/singleProfile/:id", singleEmployeeProfileController)
app.post("/updateProfile/:id", updateProfileController)
app.post("/holdProfile", holdProfileController)
app.delete("/deleteProfile", deleteProfile)
app.get("/allWithoutHold", allProfileWithOutHold)

//<===== Server =====>
app.listen(port, ( ) => {
    console.log(`Server is running on port ${port}`);    
})
