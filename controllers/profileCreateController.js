const Profile = require("../models/profileCreateModel")

let profileCreateController = async (req, res) => {
    let { name, email, designation, phoneNumber, bloodGroup, gender, dob } = req.body

    let firstName = name.slice(0, 3)
    let randomNum = Date.now().toString()
    let autoId = firstName + randomNum.slice(-4)

    // Cam not create more profile using one email
    let existingUser = await Profile.findOne({ email: email })
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "this email already exist"
        }) 
    }

    let profile = new Profile({
        employeeId: autoId,
        name: name,
        email: email,
        designation:designation,
        phoneNumber: phoneNumber,
        bloodGroup: bloodGroup,
        gender: gender,
        dob: dob
    })
    profile.save()
    return res.status(201).json({
        success: true,
        message: "profile Create success.",
        profile: profile
    })
}

let getAllProfileController = async(req, res) => {
    let allData = await Profile.find({})
    return res.status(200).json({
        success: false,
        message: "All profile data.",
        data : allData
    })
}

let singleEmployeeProfileController = async(req, res) => {
    let {id} = req.params
    let singleProfile = await Profile.findOne({_id: id})
    return res.status(200).json({
        success: true,
        message: `${singleProfile.name} Profile.`,
        singleProfileIfor: singleProfile
    })
}

let updateProfileController = async(req, res) => {
    let {id} = req.params
    let updateProfile = await Profile.findByIdAndUpdate({_id: id}, req.body, {new: true})
    return res.status(200).json({
        success: true,
        message: "Update successful.",
        updatedProfile: updateProfile
    })

}

let holdProfileController = async(req, res) => {
    let {id} = req.body
    let existingUser = await Profile.findOne({_id: id})
    existingUser.isHold = true,
    existingUser.save()

    return res.status(200).json({
        succes: true,
        message: `${existingUser.name}'s profile is hold successfuly.`
    })
}

module.exports = { profileCreateController, getAllProfileController, singleEmployeeProfileController, updateProfileController, holdProfileController }