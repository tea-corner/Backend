import  express from "express"
import mongoose from "mongoose"

const PORT = 5000

const DB_URL = "mongodb+srv://lorex59:25092003Danil@project.lfdeyhb.mongodb.net/project?retryWrites=true&w=majority"

const app = express()

async function startApp(uri, callback){
    try {
        await mongoose.connect(DB_URL,{useNewUrlParser: true, useUnifiedTopology: true})
        app.listen(PORT, () => console.log("Server start on port" + PORT))
    }catch (e) {
        console.log(e)
    }
}

startApp()
