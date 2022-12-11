import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from "mongoose"

import postRouter from './routes/posts.js'
import userRouter from './routes/users.js'
import dotenv from 'dotenv'


const app = express();

dotenv.config();


app.use(bodyParser.json({limit: "30mb", extented : true }))
app.use(bodyParser.urlencoded({limit: "30mb", extented : true }))
app.use(cors());

// app.use('/',(req,res)=>{
//     res.send("Aoye, balle balle ");
// })
app.use('/posts', postRouter)
app.use('/users', userRouter);


// const CONNECTION_URL = 'mongodb://localhost:27017/memories'
const CONNECTION_URL = process.env.MONGOURI
const PORT = process.env.PORT || 4000

mongoose.connect(CONNECTION_URL , { useNewUrlParser: true, useUnifiedTopology : true})
.then( ()=>{ app.listen(PORT , ()=>{ console.log(`Server is runnning at  ${PORT}`)}) })
.catch( (error)=>{ console.log(error.message) })

// mongoose.set('useFindAndModify', false)


