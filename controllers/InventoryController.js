
import Inventory from "../models/Inventory.js";
import Weapon from "../models/Weapons.js";
import Armor from "../models/Armors.js";
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
    async addArmor(req,res){
        try{
            const armorPost = req.body
            const armor = await Armor.create(armorPost)
            console.log(armorPost)
            res.json(armor)
        }catch (e){
            res.json(e.message)
        }

    }
    async addResources(req,res){
        try{
            const resourcesPost = req.body
            const resources = await Resource.create(resourcesPost)
            console.log(resourcesPost)
            res.json(resources)
        }catch (e){
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

            if (req.query.type === "weapons") {
                const w = await Weapon.findOne({name: req.query.name})
                if (w === null) {
                    res.json("Weapons isn't find ")
                    return
                }
                else{
                    weapons.push(w)
                }

            } else if (req.query.type === "armors") {
                const a = await Armor.findOne({name: req.query.name})
                armors.push(a)
                if (a === null) {
                    res.json("Armors isn't find ")
                    return
                }
                else{
                    weapons.push(a)
                }
            } else if (req.query.type === "resources") {
                const r = await Resource.findOne({name: req.query.name})
                resources.push(r)
                if (r === null) {
                    res.json("Resources isn't find ")
                    return
                }
                else{
                    weapons.push(r)
                }
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