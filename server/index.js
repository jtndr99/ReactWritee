const express = require('express');
const app = express();
const mongoose=require('mongoose')
const dotenv=require('dotenv');

dotenv.config();

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database is connected successfully!")

    }
    catch(err){
        console.log(err)
    }
}


app.listen(5000, () => {
    console.log("Server is running on port 5000");
    connectDB();
})