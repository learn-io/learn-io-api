var reset = require('express').Router();
var crypto = require('crypto');

const mongoose=require('mongoose');


const userInfo=require('../models/userInfo.js');
const bcrypt=require('bcrypt');

const handleResetRequest=(req,res)=>{
	if(req.session.username){
		return res.status(401).json('already logged in');
	}
	const {username,email}=req.body;
	if(!username || !email)
	{
		return res.status(400).json("Must supply both username and email");
	}
	userInfo.findOne({username:username, email:email},function(err,result){
		if(err){res.status(400).json('err')}
		if(!result){
			res.status(401).json('invalid username email combo')
		}else{
			req.session.resetKey = crypto.createHash('sha256').update(username).update(email).digest('utf8');
			req.session.resetUser = username;
			//TODO: email req.session.resetKey
			
			res.status(200).json("Check your email!");
		}
	})
}

const handleResetPassword=(req,res)=>{
	if(req.session.username){
		return res.status(401).json('already logged in');
	}
	const {key,newpass}=req.body;
	
	if(!key || !newpass)
	{
		return res.status(400).json("Must supply both key and newpass");
	}

	if(req.session.resetKey != key){
		return res.status(401).json('invalid key');
	}
	userInfo.findOneAndUpdate({ username:req.session.resetUser},{password:crypto.createHash('sha256').update(newpass).digest('utf8')},function(err,result){
		if(err){res.status(400).json('err')}
		if(!result){
			res.status(400).json('Does the user still exist?')
		}else{
			req.session.resetKey = undefined;
			req.session.resetUser = undefined;
			res.status(200).json("Password reset!");
		}
	})
}
reset.post("/request",(req,res)=>{handleResetRequest(req,res)})
reset.post("/password",(req,res)=>{handleResetPassword(req,res)})

module.exports = reset;