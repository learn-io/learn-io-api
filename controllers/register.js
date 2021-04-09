var router = require('express').Router();
const mongoose=require('mongoose');


const userInfo=require('../models/userInfo.js');
const bcrypt=require('bcrypt');


// const userInfo=require('../models/userInfo');
const handleRegister=(req,res)=>{
	if(req.session.username){
		return res.status(401).json('already logged in');
	}
	const {username,password,verifyPassword, email,dateOfBirth}=req.body;
	if(!username||!password||!verifyPassword||!email||!dateOfBirth){
		return res.status(400).json('incorrect form submission');
	}
	if(password!=verifyPassword){
		return res.status(401).json('password does not match ');
	}
	const hash=bcrypt.hashSync(password, 5);
	const newUser=new userInfo({
		admin:(username == 'admin'),
		username:username,
		password:hash,
		email:email,
		dateOfBirth:dateOfBirth
	});
	newUser.save()
	.then(data=>{
		req.session.username = username;
		req.session.isAdmin = (username == 'admin'); // :)
		res.status(200).json(username);
	})
	.catch(err=>res.status(400).json('unable to register'));
}


router.post("/",(req,res)=>{handleRegister(req,res)})

module.exports=router;