import Router from "express"
import UserController from "../controllers/UserController.js"
import InventoryController from "../controllers/InventoryController.js";
import HabitsController from "../controllers/HabitsController.js";
import ToDoController from "../controllers/ToDoController.js";
import DailiesController from "../controllers/DailiesController.js";

const router = new Router()

router.get("/user", UserController.getUser)
router.post("/user", UserController.create)
router.delete("/user/:id", UserController.deleteUser)

router.get("/user/inventory/:nickname", InventoryController.getUserInventory)
router.post("/user/inventory", InventoryController.createUserInventory)

router.post("/user/habits/:nickname", HabitsController.createHabit)
router.patch("/user/habits", HabitsController.updateHabit)

router.post("/user/todo/:nickname", ToDoController.createToDo)
router.patch("/user/todo", ToDoController.updateToDo)

router.post("/user/dailies/:nickname", DailiesController.createDailies)
router.patch("/user/dailies", DailiesController.updateDailies)


export default router