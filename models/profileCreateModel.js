const mongoose = require('mongoose')
const { Schema } = mongoose

const profileSchema = new Schema({
    employeeId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phoneNumer: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "custom"],
        required: true
    },
    dob: {
        type: String,
        required: true
    },
})


module.exports = mongoose.model("EmployeeProfile", profileSchema)