import  express from "express"
import mongoose from "mongoose"
import cors from "cors"
import routers from "./routes/routess.js"

const PORT = 7000

const DB_URL = "mongodb+srv://lorex59:25092003Danil@project.lfdeyhb.mongodb.net/project?retryWrites=true&w=majority"

const app = express()
//sdfsf

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}))

app.use(express.json())
app.use("/api", routers)
app.use("/api", express.static('public'))

async function startApp(uri, callback){
    try {
        console.log()
        await mongoose.connect(DB_URL,{useNewUrlParser: true, useUnifiedTopology: true})
        app.listen(PORT, () => console.log("Server start on port" + PORT))
    }catch (e) {
        console.log(e)
    }
}

startApp()
