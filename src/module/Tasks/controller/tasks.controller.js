import { asyncHandler } from "../../../service/asyncHandler.js"
import taskModel from "../../../../DB/model/taskModel.js"
import { create, find, findById, findByIdAndDelete, findByIdAndUpdate } from "../../../../DB/DBmethods.js"



export const getAllTasks = asyncHandler(async (req, res, next) => {
    const tasks = await find({ model: taskModel });
    if (tasks) {
        return res.status(200).json({ message: "Done", tasks })
    } else {
        return next(new Error("no Tasks found"), { cause: 404 })
    }
})

export const createTask = asyncHandler(async (req, res, next) => {
    let { name, description } = req.body;
    const newTask = await create({ model: taskModel, data: { name, description } })
    if (newTask) {
        return res.status(201).json({ message: "Task created", newTask })
    } else {
        return next(new Error("something went wrong please try again later"), { cause: 500 })
    }
})

export const getTask = asyncHandler(async (req, res, next) => {
    let { id: taskID } = req.params;
    const task = await findById({ model: taskModel, condition: { _id: taskID } });
    if (task) {
        return res.status(200).json({ message: "Task found", task })
    } else {

        return next(new Error("task not found"), { cause: 404 })
    }

})

export const deleteTask = asyncHandler(async (req, res, next) => {
    let { id: taskID } = req.params;
    let deletedTask = await findByIdAndDelete({ model: taskModel, condition: { _id: taskID } });
    if (deletedTask) {
        return res.status(200).json({ message: "Task deleted", deletedTask })
    } else {
        return next(new Error("something went wrong"), { cause: 500 })
    }
})

export const updateTask = asyncHandler(async (req, res, next) => {
    let { id: taskID } = req.params;


    const updatedTask = await findByIdAndUpdate({
        model: taskModel,
        condition: { _id: taskID },
        data: req.body, options: { new: true }
    })
    if (updatedTask) {
        return res.status(200).json({ message: "Task updated", updatedTask })
    } else {
        return next(new Error("something went wrong"), { cause: 500 })
    }


})