import  mongoose from "mongoose"


const User = new mongoose.Schema({
    userNickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 0,
        required: false
    },
    hp: {
        type: Number,
        default: 50,
        required: false
    },
    exp: {
        type: Number,
        default: 0,
        required: false
    },
    class: {
        type: Number,
        required: false
    },
    balance: {
        type: Number,
        default: 0,
        required: false
    },
    activityTools: {
        //FIXME
        type: Number,
        required: false
    },
    dungeon: {
        //FIXME
        type: Number,
        required: false
    },
    challengeBoard: {
        //FIXME
        type: Number,
        required: false
    },
    quest: {
        //FIXME
        type: Number,
        required: false
    }
},{ versionKey: false })

export default mongoose.model("users", User)