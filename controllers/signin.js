var router = require('express').Router();
const mongoose=require('mongoose');

const userInfo=require('../models/userInfo.js');
const bcrypt=require('bcrypt');

const handleWho=(req,res)=>{
	res.status(200).json([req.session.username, req.session.isAdmin]);
}

const handleSignin=(req,res)=>{
	if(req.session.username)
	{
		return res.status(400).json('already logged in');
	}
	const {username,password}=req.body;
	if(!username||!password){
		return res.status(400).json('incorrect form submission');
	}
	// userInfo
 //  		.find({username:username})
 //  		.exec()
 //  		.then((users)=>{
 //  			users
 //  				.forEach((user)=>{
 //  					const isValid=bcrypt.compareSync(password, user.password);
 //  					if(isValid){
 //  						res.status(200).json(user.username);
 //  					}else{
 //  						res.status(400).json('wrong credentials')
 //  					}
 //  				})
 //  		})
 //  		.catch(err=>res.status(400).json('wrong credentials'))
 	userInfo.findOne({username:username},function(err,result){
 		if(err){res.status(400).json('err')}
 		if(!result){
 			res.status(401).json('user is not exist')
 		}else{
 			const isValid=bcrypt.compareSync(password, result.password);
			if(isValid){
				req.session.username=result.username;
				req.session.isAdmin = (result.username == 'admin'); // :)
				res.status(200).json(result.username);
			}else{
				res.status(401).json('wrong password')
			}
 		}
 	})
}

router.post("/",(req,res)=>{handleSignin(req,res)})

router.get("/whoami",(req,res)=>{handleWho(req,res)})

module.exports = router;