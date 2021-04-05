var router = require('express').Router();
const mongoose=require('mongoose');


const userInfo=require('../models/userInfo.js');
const bcrypt=require('bcrypt-nodejs');


// const userInfo=require('../models/userInfo');
const handleRegister=(req,res)=>{
	const {username,password,verifyPassword, email,dateOfBirth}=req.body;
	if(!username||!password||!verifyPassword||!email||!dateOfBirth){
		return res.status(400).json('incorrect form submission');
	}
	if(password!=verifyPassword){
		return res.status(401).json('password does not match ');
	}
	const hash=bcrypt.hashSync(password);
	const newUser=new userInfo({
		username:username,
		password:hash,
		email:email,
		dateOfBirth:dateOfBirth
	});
	newUser.save()
	.then(data=>{
		req.session.username = result.username;
		req.session.isAdmin = (result.username == 'admin'); // :)
		res.json(username)
	})
	.catch(err=>res.status(400).json('unable to register'));
}


router.post("/",(req,res)=>{handleRegister(req,res)})

module.exports=router;