import { Router } from "express";
import * as tasksController from './controller/tasks.controller.js'
const router = Router()



router.get("/", tasksController.getAllTasks)
router.get("/:id", tasksController.getTask)
router.delete("/:id", tasksController.deleteTask)
router.patch("/:id", tasksController.updateTask)
router.post("/", tasksController.createTask)




export default router