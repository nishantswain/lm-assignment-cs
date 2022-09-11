const { ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose')
function connectToDB() {
    mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }, (err) => {
        if (err) {
            console.log("Error connecting to mongo db", err)
            throw new Error(err)
        }
        console.log("===================Connected to mongodb via mongoose==================")
    })
}

module.exports = { connectToDB }

