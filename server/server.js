const express = require('express');
const cors = require("cors")
const { connectToDB } = require('./db');
const bodyParser = require('body-parser')
const collegeRouter = require('./router/college.router');
const studentRouter = require('./router/student.router');
const dotenv = require('dotenv');
const courseRouter = require('./router/course.router');

dotenv.config()

connectToDB()
const app = express();
app.use(bodyParser.json())
app.use(cors())
app.use("/v1/student", studentRouter)
app.use("/v1/college", collegeRouter)
app.use("/v1/course", courseRouter)
let PORT = process.env.PORT || 4666
app.listen(PORT, () => {
    console.log(`App started! at localhost:${PORT}`)
})