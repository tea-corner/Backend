import mongoose from "mongoose"

const Weapon = new mongoose.Schema({
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

const Armor = new mongoose.Schema({
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


const Inventory = new mongoose.Schema({
    userNickname: {
        type: String,
        required: true
    },
    weapons:[Weapon],
    armors:[Armor],
    resources:[Resource]

},{ versionKey: false })


export default mongoose.model("Inventories", Inventory)
