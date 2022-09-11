const College = require('../models/College')
const Student = require('../models/Student')

const collegeRouter = require('express').Router()

collegeRouter.use((req, res, next) => {
    // console.log("College router middleware")
    next()
})

collegeRouter.post('/create', async (req, res) => {
    let college = new College({
        collegeId: req.body.collegeId,
        college_name: req.body.college_name,
        location: req.body.location,
        year_founded: req.body.year_founded,
        courses: req.body.courses
    })
    try {
        let db_response = await college.save()
        res.send({ message: "College created!", data: db_response })
    }
    catch (err) {
        console.log("Error in create college end point", err)
        res.status(500).send({ message: "Error creating college", })
    }
})

collegeRouter.get('/list', async (req, res) => {
    try {
        let db_response = await College.find()
        let agOutput = await College.aggregate([{
            $lookup: {
                from: "Course",
                localField: "courses",
                foreignField: "courseId",
                as: "course_data"
            },

        },
        {
            $project: {
                _id: 0,
                college_name: 1,
                collegeId: 1,
                year_founded: 1,
                location: 1,

                "course_data.course_name": 1
            }
        },
        ])
        res.send({ message: "college list!", data: agOutput })
    }
    catch (err) {
        console.log("Error in college list end point", err)
        res.status(500).send({ message: "Error getting college list course", })
    }
})

collegeRouter.get('/getCollege/:filter/:value', async (req, res) => {
    let { filter, value } = req.params
    if (filter === 'id') {
        try {
            let agOutput = await College.aggregate([
                {
                    $match: {
                        collegeId: value
                    }
                },

                {
                    $lookup: {
                        from: "Course",
                        localField: "courses",
                        foreignField: "courseId",
                        as: "course_data"
                    },

                },
                {
                    $project: {
                        _id: 0,
                        college_name: 1,
                        collegeId: 1,
                        year_founded: 1,
                        location: 1,
                        "course_data.course_name": 1
                    }
                },
            ])
            res.send({ message: "College Data!", data: agOutput[0] })
        }
        catch (err) {
            console.log("Error in getCollege by id end point", err)
            res.status(500).send({ message: "Error in getCollege by id", })
        }
    }
    else if (filter === 'name') {
        try {
            let db_response = await College.find({ name: value })
            console.log(db_response)
            res.send({ message: "College Data!", data: db_response[0] })
        }
        catch (err) {
            console.log("Error in getCollege by name end point", err)
            res.status(500).send({ message: "Error in getCollege by name", })
        }
    }


})

collegeRouter.get('/simillarCollege/:collegeId/:filter', async (req, res) => {
    try {
        let filter = req.params.filter
        console.log(req.params)
        let collegeId = req.params.collegeId
        let data = null
        let college = await College.findOne({ collegeId: collegeId })
        if (college) {
            if (filter === 'course') {
                data = await College.find({ courses: { $in: college.courses } }).select({ "college_name": 1, "_id": 0 })
                data = data.filter((item) => item.college_name !== college.college_name)
                res.send({ message: `Colleges simillar to ${college.college_name} by courses`, data })
            }
            else if (filter === 'location') {
                data = await College.find({ location: { $in: college.location } }).select({ "college_name": 1, "_id": 0 })
                data = data.filter((item) => item.college_name !== college.college_name)
                res.send({ message: `Colleges simillar to ${college.college_name} by location`, data })
            }
        }
        else if (filter === 'numOfStudents') {
            let numOfStudents = await Student.find({ collegeId }).count()
            console.log(numOfStudents)
        }
        else {
            res.status(500).send({ message: `Could not find college` })
        }
    }
    catch (err) {
        console.log("Error in simillar college endpoint", err)
        res.send({ message: "Error in simillar college endpoint" })
    }

})

collegeRouter.get('/stats/:filter', async (req, res) => {
    try {

        let { filter } = req.params

        if (filter === 'location') {
            let agOutput = await College.aggregate([{
                $group: {
                    _id: { location: "$location", }, count: { $sum: 1 }
                }
            }])
            let total = 0
            let color = 38627
            agOutput = agOutput.map((item) => {
                color += 2000
                total += item.count
                return { title: item._id.location, value: item.count, color: "#E" + (color) }
            })
            res.send({ message: "college location stats", data: agOutput, total })
        }
        else if (filter === 'year_founded') {
            let agOutput = await College.aggregate([{
                $group: {
                    _id: { year_founded: "$year_founded", }, count: { $sum: 1 }
                },

            }])
            let color = 38627
            let total = 0
            agOutput = agOutput.map((item) => {
                color += 2000
                total += item.count
                return { title: item._id.year_founded, value: item.count, color: "#E" + (color) }
            })
            res.send({ message: "college year_founded stats", data: agOutput, total })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "err in college stats endpoint" })
    }
})



module.exports = collegeRouter