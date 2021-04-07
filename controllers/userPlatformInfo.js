var router = require('express').Router();
const mongoose=require('mongoose');

const userPlatformInfoSchema=require('../models/userPlatformInfo.js');
const platformSchema=require('../models/platform.js');

const handleUserPlay=(req,res)=>{
	const {username,platformName}=req.body;
	if(!platformName){
		return res.status(400).json('incorrect form submission');
	}
	if(!username){
		return res.json("guest");
	}
	var platformOwner=false;
	platformSchema.findOne({platformName:platformName},function(err,result){
 		if(err){res.status(400).json('err')}
 		if(!result){
 			res.status(401).json('platform is not exist')
 		}else{
			if(result.owner==username){
				platformOwner=true;
			}
			const newPlatformUser=new userPlatformInfoSchema({
		 		username:username,
				platformName:platformName,
				ownPlatform:platformOwner
			});
			newPlatformUser.save()
			.then(data=>{
				res.json("create new platform user")
			})
			.catch(err=>res.status(400).json('unable to create new platform user'));
 		}
 	})
 	
}

router.post("/",(req,res)=>{handleUserPlay(req,res)})
module.exports=router;