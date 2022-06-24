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

router.get("/user/inventory", InventoryController.getUserInventory)
router.post("/user/inventory", InventoryController.createUserInventory)

router.get("/user/habits", HabitsController.getHabits)
router.post("/user/habits", HabitsController.createHabit)
router.patch("/user/habits", HabitsController.updateHabit)

router.get("/user/todos", ToDoController.getToDo)
router.post("/user/todos", ToDoController.createToDo)
router.patch("/user/todos", ToDoController.updateToDo)

router.get("/user/dailies", DailiesController.getDailies)
router.post("/user/dailies", DailiesController.createDailies)
router.patch("/user/dailies", DailiesController.updateDailies)


export default router