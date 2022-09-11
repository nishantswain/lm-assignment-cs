const Course = require('../models/Course');

const courseRouter = require('express').Router();


courseRouter.use((req, res, next) => {
    console.log("Course router middleware")
    next()
})


courseRouter.post('/create', async (req, res) => {
    let course = new Course({ courseId: req.body.courseId, course_name: req.body.course_name })
    try {
        let db_response = await course.save()
        res.send({ message: "Course created!", data: db_response })
    }
    catch (err) {
        console.log("Error in create Course end point", err)
        res.status(500).send({ message: "Error creating course", })
    }
})

courseRouter.get('/list', async (req, res) => {
    try {
        let db_response = await Course.find()
        res.send({ message: "Course list!", data: db_response })
    }
    catch (err) {
        console.log("Error in course list end point", err)
        res.status(500).send({ message: "Error creating course", })
    }
})


module.exports = courseRouter