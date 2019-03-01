const express = require('express')
const parser = require('body-parser')
const app = express()
const userService = require('./services/userService')
const cors=require('cors')
app.use(cors())
app.use(parser.json())

//fetch all users from mongo
app.get('/users',(rq,rs)=>{
    rs.setHeader('content-type','application/json')
    // fetch all users from mongo via mongoose
    userService.all((err,rows)=>{
        if(err) rs.end('Error Occured')
        else{
            rs.json(rows)
        }
    })    
})
app.listen(4210,()=>{
    console.log('Server running at 4210')
})



// add a new user
app.post('/user/add',(req,res)=>{
    res.setHeader('content-type','application/json')
    const user = req.body
	console.log(user)
    userService.add(user,(err,result)=>{
        if(err) {
            res.json({message:'Error Occured ',err})
        }
        else{
            res.json({message:'User Added Successfully'})
        }
    })
})

