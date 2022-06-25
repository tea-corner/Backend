import mongoose from "mongoose";

const Resource = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    damage:{
        type: Number,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    isUsing:{
        type: Boolean,
        required: true
    },
    rarity:{
        type: Number,
        required: true
    }
},{ versionKey: false })

export default mongoose.model("Resources", Resource)