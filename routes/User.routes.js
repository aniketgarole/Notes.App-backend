const express = require("express")
const { UserModel } = require("../model/User.model")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const userRouter = express.Router()


userRouter.get("/", (req, res)=> {
    res.status(200).json({"msg": "Welcome to Home Page"})
})


userRouter.post("/register", async(req, res)=>{
    
        const {password} = req.body
        bcrypt.hash(password, 5, async function(err, hash) {
            // Store hash in your password DB.
            try {
                if (hash) {

                    const newUser = new UserModel({...req.body, password:hash})
                    await newUser.save()
                    res.status(200).json({"msg": "New user has been register"})
                } else {
                    console.log(err)
                }
            } catch (error) {
                res.status(400).json({"err":error.message})
            }
           
        });
        
        
    
})

userRouter.post("/login", async(req, res)=> {
    

    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email})
        if (user){
            const token = jwt.sign({ authorId: user._id, author: user.name }, 'avenger');
            const passwordSentByUser = password
            const passwordFromDB = user.password
            bcrypt.compare(passwordSentByUser, passwordFromDB,  async function(err, result) {
                try {
                    if(result) {
                        res.status(200).json({"msg":"Login Successful", "token": token})
                    } else{
                        res.status(200).json({"msg": "Wrong Password"})
                        
                    }
                    
                } catch (error) {
                    res.status(400).json({"err": error.message})
                }
                
            })
            
        }else {
            res.status(200).json({"msg": "User does not exist"})
        }
        
    } catch (error) {
        res.status(400).json({"err":error})
    }
    

    
})





module.exports = {userRouter}