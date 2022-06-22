import mongoose from "mongoose"

const Dailies = new mongoose.Schema({
    name: {
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
    },
    completed: {
        type: Boolean,
        default: false,
        required: false
    }
},{ versionKey: false })

export default mongoose.model("Dailies", Dailies)