const mongoose = require('mongoose')

const CollegeSchema = new mongoose.Schema({
    collegeId: { type: String, unique: true, required: true },
    college_name: { type: String, required: true, unique: true },
    year_founded: { type: String },
    location: { type: String },
    Rating: { type: String },
    courses: { type: [String] },
}, {
    collection: "College",
    timestamps: true
})

module.exports = mongoose.model("College", CollegeSchema)