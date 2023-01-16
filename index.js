import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
import tasksRouter from './src/module/Tasks/tasks.router.js'
import connectDB from "./DB/DBconnection.js";
import morgan from 'morgan';
import cors from 'cors';
// import * as indexRouter from "../chat app/src/modules/index.router.js";


const app = express();

app.use(express.static("./view"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
// setup port and the baseUrl
if (process.env.ENV == "dev") {
    app.use(express.static(path.join(__dirname, './view')))
    app.use(morgan('dev'))

} else {

    app.use(morgan("COMMON"))
}
app.use(cors())

const port = process.env.PORT;
const baseUrl = process.env.BASEURL
app.use(express.static(__dirname));


app.use(`${baseUrl}tasks`, tasksRouter)
app.use('*', (req, res, next) => {
    res.send("In-valid Routing Plz check url  or  method")
})




connectDB()

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))