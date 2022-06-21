
import Inventory from "../models/Inventory.js";
import User from "../models/Users.js";

class InventoryController {

    async createUserInventory(req,res) {
        try {
            const inventoryPost = req.body
            const inventory = await Inventory.create(inventoryPost)
            console.log(inventoryPost)
            res.json(inventory)
        } catch (e) {
            res.json(e.message)
        }
    }

    async getUserInventory(req,res){
        try {
            const inventory = await Inventory.findOne({userNickname: req.params.userNickname})
            if (inventory == null) {
                console.log("404")
            }
            res.json(inventory)
            console.log(inventory)
        } catch (e){
            res.json(e.message)
        }
    }

}
export default new InventoryController()