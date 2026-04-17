const mongoose = require("mongoose")
const { Schema } = mongoose

let userSchema = new Schema({
    username: {
        type: String,
        required: [true, "User name is required."]
    },
    useremail: {
        type: String,
        required: [true, "Email is required."],
        trim: true,
        lowerCase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    userpassword: {
        type: String,
        required: [true, "Password is required."],
        min: [6, "Too low."],
        max: [10, "Too high."],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Please fill a valid password']
    },
    photo: {
        type: String
    },
    nid: {
        type: Number,
        min: [10, "Too low."],
        max: [17, "Too high."]
    },
    address: {
        type: String
    },
    isLogin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Employee", userSchema)