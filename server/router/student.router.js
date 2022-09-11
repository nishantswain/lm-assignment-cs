const Student = require('../models/Student')

const studentRouter = require('express').Router()

studentRouter.use((req, res, next) => {
    console.log("Student router middleware")
    next()
})


studentRouter.post('/register', async (req, res) => {
    let student = new Student({
        studentId: req.body.studentId,
        student_name: req.body.student_name,
        batch_year: req.body.batch_year,
        skills: req.body.skills,
        courses: req.body.courses,
        collegeId: req.body.collegeId,
    })
    try {
        let db_response = await student.save()
        res.send({ message: "Student registered!", data: db_response })
    }
    catch (err) {
        console.log("Error in register student end point", err)
        res.status(500).send({ message: "Error register student", })
    }

})

studentRouter.get('/getStudent/:id', async (req, res) => {

    try {
        console.log(req.params)
        let studentId = req.params.id
        let stu = await Student.findOne({ '_id': studentId })
        if (!stu)
            res.send({ message: "Retrived student successfully by id", data: stu })
        else
            res.send({ err: "No student available for this id", data: stu })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Error getting student data by id", data: null })
    }

})

studentRouter.get('/list', async (req, res) => {
    try {
        let agOutput = await Student.aggregate([{
            $lookup: {
                from: "College",
                localField: "collegeId",
                foreignField: "collegeId",
                as: "college_data"
            },

        },
        {
            $lookup: {
                from: "Course",
                localField: "courses",
                foreignField: "courseId",
                as: "course_data"
            }

        },
        {
            $project: {
                _id: 0,
                studentId: 1,
                student_name: 1,
                batch_year: 1,
                skills: 1,
                "college_data.college_name": 1,
                "course_data.course_name": 1
            }
        },
        ])
        console.log(agOutput)
        res.send({ message: "Student list!", data: agOutput })
    }
    catch (err) {
        console.log("Error in student list end point", err)
        res.status(500).send({ message: "Error getting college list course", })
    }
})



module.exports = studentRouter