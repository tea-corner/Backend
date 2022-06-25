import mongoose from "mongoose"




const Inventory = new mongoose.Schema({
    userNickname: {
        type: String,
        required: true
    },
    weapons:[],
    armors:[],
    resources:[]

},{ versionKey: false })


export default mongoose.model("Inventories", Inventory)
