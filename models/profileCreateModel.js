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
    designation: {
        type: String,
        required: true
    }
    ,
    phoneNumber: {
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
    isHold:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("EmployeeProfile", profileSchema)