import Router from "express"
import UserController from "../controllers/UserController.js"
const router = new Router()

router.get("/users", UserController.getAllUsers)
router.post("/users",UserController.create)
router.delete("/users/:id",UserController.deleteUser)
router.get("/user/inventory/:nickname", UserController.getUserInventory)
router.post("/user/inventory", UserController.createUserInventory)

export default router