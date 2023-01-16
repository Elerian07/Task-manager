import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../config/.env') })
const connectDB = async () => {
    mongoose.set('strictQuery', false);
    return await mongoose.connect(process.env.DBURI)

        .then(res => console.log(`DB Connected successfully`))
        .catch(err => console.log(` Fail to connect  DB.........${err} `))

}


export default connectDB;