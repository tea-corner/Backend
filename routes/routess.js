import Router from "express"
import UserController from "../controllers/UserController.js"
import InventoryController from "../controllers/InventoryController.js";
import HabitsController from "../controllers/HabitsController.js";
import ToDoController from "../controllers/ToDoController.js";
import DailiesController from "../controllers/DailiesController.js";

const router = new Router()

router.get("/users/:id", UserController.getUser)
router.post("/users",UserController.create)
router.delete("/users/:id",UserController.deleteUser)

router.get("/user/inventory/:nickname", InventoryController.getUserInventory)
router.post("/user/inventory", InventoryController.createUserInventory)

router.post("/users/habits/:nickname", HabitsController.createHabit)
router.patch("/users/habits/:nickname", HabitsController.updateHabit)

router.post("/user/todo/:nickname", ToDoController.createToDo)
router.patch("/user/todo/:nickname", ToDoController.updateToDo)

router.post("/user/dailies/:nickname", DailiesController.createDailies)
router.patch("/user/dailies/:nickname", DailiesController.updateDailies)


export default router