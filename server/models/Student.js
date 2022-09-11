const mongoose = require('mongoose')
let { Schema, model, } = mongoose
let { Types } = Schema
const StudentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    student_name: { type: String, required: true, },
    batch_year: { type: Number },
    skills: { type: [String] },
    courses: [String],
    collegeId: { type: String, required: true },
}, {
    collection: "Student",
    timestamps: true
})

module.exports = model("Student", StudentSchema)