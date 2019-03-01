const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/users')
const Schema = mongoose.Schema
const schema = new Schema({  firstName :String });
const UserModel = mongoose.model('userdata',schema)

//fetch all users
const findAll = (callback)=>{
        UserModel.find({},{_id :false, __v :false},(err,rows)=>{
            callback(err,rows)
        })
}

// add a new user document to the collection
const addUser = (user,callback)=>{
	console.log(user)
        const userObj = new UserModel({firstName:user.firstName})
        UserModel.create(userObj,(err,result)=>{
            callback(err,result)
        })
}

module.exports ={
    all : findAll,
    
    add : addUser,
   
}