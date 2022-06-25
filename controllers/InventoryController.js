
import Inventory from "../models/Inventory.js";
import User from "../models/Users.js";
import Armor from "../models/Inventory.js";
import Weapon from "../models/Weapons.js";
import Resource from "../models/Resources.js";

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
    async addWeapon(req,res){
        try{
            const weaponPost = req.body
            const weapon = await Weapon.create(weaponPost)
            console.log(weaponPost)
            res.json(weapon)
        }catch (e){
            res.json(e.message)
        }

    }

    async updateUserInventory(req, res) {
        try {
            const inventory = await Inventory.findOne({userNickname: req.query.nickname})

            if (inventory === null) res.json("User not found")

            let weapons = inventory.weapons
            let armors = inventory.armors
            let resources = inventory.resources

            if (req.query.type === "Weapons") {
                const w = Weapon.findOne({name: req.query.name})
                console.log(w)
                weapons.push(w)
            } else if (req.query.type === "Armors") {
                const a = Armor.findOne({name: req.query.name})
                armors.push(a)
            } else if (req.query.type === "Resources") {
                const r = Resource.findOne({name: req.query.name})
                resources.push(r)
            }

            Inventory.findOneAndUpdate(
                {userNickname: req.query.nickname},
                {$set: {
                        weapons: weapons,
                        armors: armors,
                        resources: resources
                    }},
                {
                    returnDocument: "after"
                },
                function (err, result) {
                    if (err) console.log(err)
                    res.json(result)
                }
            )

        } catch(e) {
            console.log(e)
        }
    }

    async getUserInventory(req,res){
        try {
            const inventory = await Inventory.findOne({userNickname: req.query.nickname})
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