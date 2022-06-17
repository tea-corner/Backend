import  mongoose from "mongoose"


const User = new mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    hp: {
        type: Number,
        required: true
    },
    exp: {
        type: Number,
        required: true
    },
    class: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    inventory: {
        //FIXME
        type: Number,
        required: true
    },
    habits: {
        //FIXME
        type: Number,
        required: true
    },
    dailies: {
        //FIXME
        type: Number,
        required: true
    },
    toDo: {
        //FIXME
        type: Number,
        required: true
    },
    activityTools: {
        //FIXME
        type: Number,
        required: true
    },
    dungeon: {
        //FIXME
        type: Number,
        required: true
    },
    challengeBoard: {
        //FIXME
        type: Number,
        required: true
    },
    quest: {
        //FIXME
        type: Number,
        required: true
    }
},{ versionKey: false })

export default mongoose.model("users", User)