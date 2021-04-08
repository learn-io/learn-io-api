var router = require('express').Router();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userInfo=require('../models/userInfo.js');


const handleSetting=(req,res)=>{
	const {email,dateOfBirth,oldPassword,newPassword,mute}=req.body;
	const username = req.session.username;
	if(!username){
		return res.status(401).json('error');
	}
	if(!email&&!dateOfBirth&&!newPassword&&!mute){
		return res.status(400).json('nothing changed');
	}
	// change email address
	if(email){
		userInfo.findOneAndUpdate({username:username},{email:email},(err,data)=>{
			if(err){
				res.status(400).json('err')
			}else{
				if(!data){
					res.status(400).json('user is not exist')
				}else{
					res.status(200).json("Success Update Email");
				}
			}
		});
	}
	// change date of birth
	if(dateOfBirth){
		userInfo.findOneAndUpdate({username:username},{dateOfBirth:dateOfBirth},(err,data)=>{
			if(err){
				res.status(400).json('err')
			}else{
				if(!data){
					res.status(400).json('user is not exist')
				}else{
					res.status(200).json("Success Update date of birth");
				}
			}
		});
	}
	// change mute setting
	if(mute==true||mute==false){
		userInfo.findOneAndUpdate({username:username},{mute:mute},(err,data)=>{
			if(err){
				res.status(400).json('err')
			}else{
				if(!data){
					res.status(400).json('user is not exist')
				}else{
					res.status(200).json("Success mute setting");
				}
			}
		});
	}
	// change password
	if(newPassword){
		userInfo.findOne({username:username},function(err,result){
	 		if(err){res.status(400).json('err')}
	 		if(!result){
	 			res.status(400).json('user is not exist')
	 		}else{
	 			const isValid=bcrypt.compareSync(oldPassword, result.password);
				if(isValid){
					const hash=bcrypt.hashSync(newPassword, 5);
					userInfo.findOneAndUpdate({username:username},{password:hash},(err,data)=>{
						if(err){
							res.status(400).json('err')
						}else{
							res.status(200).json("Success update password");
						}
					});
				}else{
					res.status(400).json('wrong password')
				}
	 		}
	 	})
	}
}

router.post("*", (req,res,next)=>{
	if(req.session.username)
		next();
	else
		res.status(401).json("Must be logged in to post data");

})

router.post("/",(req,res)=>{handleSetting(req,res)})

module.exports=router;