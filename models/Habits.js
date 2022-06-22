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
        required: false
    },
    counter: {
        type: Number,
        default: 0,
        required: false
    },
    completed: {
        type: Boolean,
        required: false
    },
    // start: {
    //     type: Date,
    //     default: Date.now(),
    //     required: false
    // },
    // end: {
    //     type: Date,
    //     required: true
    // },
    duration: {
        type: Number,
        required: true
    },
    difficult: {
        type: Number,
        required: false
    },
    userNickname: {
        type: String,
        required: true
    }
},{ versionKey: false })

export default mongoose.model("habits", Habit)