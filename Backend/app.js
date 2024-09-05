require("dotenv").config();
const express =require("express")
const db=require("./config/connectToDb")
const cors=require("cors")
const {errorHandler, notFound}=require("./middlewares/error")
const xss=require("xss-clean")
//connection to db
db()

//init app
const app=express()


//Middlewares

app.use(express.json())

// Prevent XSS(Cross Site Scripting) Attacks

app.use(xss())

app.use(cors())

//Routes

app.use("/api/auth",require("./routes/authRoute"))
app.use("/api/users",require("./routes/usersRoute"))
app.use("/api/posts",require("./routes/postsRoute"))
app.use("/api/comments",require("./routes/commentsRoute"))
app.use("/api/categories",require("./routes/categoriesRoute"))


app.get("/",(req,res)=>{
    res.send("hello from epress server")
})


app.use(notFound)
app.use(errorHandler)


//running the server
const port=process.env.PORT || 3000

app.listen(port,()=>{
    console.log("server is running in " +process.env.NODE_ENV+ " mode on port "+ port)
})


