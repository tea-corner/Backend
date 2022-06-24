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
        required: false
    },
    userNickname: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: false
    }
},{ versionKey: false })

export default mongoose.model("ToDo", ToDo)