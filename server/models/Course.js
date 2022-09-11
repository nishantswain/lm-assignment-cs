const mongoose = require('mongoose')
let { Schema, model, } = mongoose
let { Types } = Schema
const CourseSchema = new Schema({
    courseId: { type: String, unique: true, required: true },
    course_name: { type: String, unique: true },
}, {
    collection: "Course",
    timestamps: true
})

module.exports = model("Course", CourseSchema)