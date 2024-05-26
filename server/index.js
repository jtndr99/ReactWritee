const express = require('express');
const app = express();
const mongoose=require('mongoose')
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth.js');
const userRoute=require('./routes/users.js');
const postRoute=require('./routes/posts.js');
const commentRoute=require('./routes/comments.js');



dotenv.config();
app.use(express.json())
app.use(cookieParser());
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)



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