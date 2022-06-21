import mongoose from "mongoose"


const ToDo = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    difficult: {
        type: Number,
        required: true
    },
    userNickname: {
        type: String,
        required: true
    }
},{ versionKey: false })

export default mongoose.model("ToDo", ToDo)