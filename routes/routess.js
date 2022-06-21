import Router from "express"
import UserController from "../controllers/UserController.js"
import InventoryController from "../controllers/InventoryController.js";
const router = new Router()

router.get("/users/:id", UserController.getUser)
router.post("/users",UserController.create)
router.delete("/users/:id",UserController.deleteUser)
router.get("/user/inventory/:nickname", InventoryController.getUserInventory)
router.post("/user/inventory", InventoryController.createUserInventory)

export default router