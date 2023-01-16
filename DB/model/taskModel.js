import { Schema, model, Types } from "mongoose";


const taskSchema = new Schema({

    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    description: {
        type: String,
        min: [2, 'minimum length 2 char'],
        max: [1000, 'max length 2 char']

    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const taskModel = model('Task', taskSchema)
export default taskModel