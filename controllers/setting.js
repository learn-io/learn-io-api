var router = require('express').Router();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userInfo=require('../models/userInfo.js');


const handleSetting=(req,res)=>{
	const {email,dateOfBirth,oldPassword,newPassword,mute}=req.body;
	const username = req.session.username;
	if(!username){
		return res.status(400).json('Username not returned');
	}
	if(!email&&!dateOfBirth&&!newPassword&&(mute==undefined)){
		return res.status(400).json('nothing changed');
	}

	let query={};
	if(email){
		query.email = email;
	}
	if(dateOfBirth){
		query.dateOfBirth = dateOfBirth;
	}
	let shouldReturn = false;
	if(newPassword&&oldPassword){
		userInfo.findOne({username:username},function(err,result){
			if(err){
				shouldReturn = true; 
				return res.status(400).json('Error on password')
			}
			if(!result){
				shouldReturn = true;
				return res.status(400).json('User does not exist');
			}else{
				const isValid=bcrypt.compareSync(oldPassword, result.password);
			   	if(isValid){
				   const hash=bcrypt.hashSync(newPassword, 5);
				   query.password = hash;
			   }else{
				   shouldReturn = true;
				   return res.status(400).json('Incorrect password');
			   }
			}
		});
	}
	console.log("Should Return: "+shouldReturn);
	if(shouldReturn){
		return;
	}
	if(mute==true||mute==false){
		query.mute = mute;
	}

	userInfo.findOneAndUpdate({username:username},query,(err,data)=>{
		if(err){
			return res.status(400).json('err');
		}else{
			if(!data){
				return res.status(400).json('User does not exist');
			}else{
				return res.status(200).json("Success Update");
			}
		}
	});
}

const handleGetSetting=(req,res)=>{
	const {username}=req.body;
	userInfo.findOne({username:username},(err,data)=>{
			if(err){
				res.status(400).json('err')
			}else{
				if(!data){
					res.status(400).json('user is not exist')
				}else{
					res.status(200).json({"email":data.email,"dateOfBirth":data.dateOfBirth,"mute":data.mute});
				}
			}
		});
}

router.post("*", (req,res,next)=>{
	if(req.session.username)
		next();
	else
		res.status(401).json("Must be logged in to post data");

})

router.post("/",(req,res)=>{handleSetting(req,res)})
router.get("/",(req,res)=>{handleGetSetting(req,res)})

module.exports=router;