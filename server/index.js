const express = require('express');
const app = express();
const mongoose=require('mongoose')
const dotenv=require('dotenv');
const cors=require('cors')
const multer=require('multer')
const path=require("path")
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth.js');
const userRoute=require('./routes/users.js');
const postRoute=require('./routes/posts.js');
const commentRoute=require('./routes/comments.js');



dotenv.config();
app.use(express.json())
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)


const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})


const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image has been uploaded successfully!")
})


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