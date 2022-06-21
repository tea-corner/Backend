import mongoose from "mongoose"

const Habit = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    type: {
        type: Boolean,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
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

export default mongoose.model("habits", Habit)