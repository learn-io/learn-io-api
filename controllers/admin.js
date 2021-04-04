var router = require('express').Router();
const mongoose=require('mongoose');

const platformSchema=require('../models/platform.js');
const userInfo=require('../models/userInfo.js');

const handleShowUsers=(req,res)=>{
	userInfo.find({},function(err,result){
 		if(err){res.status(400).json('err')}
 		if(!result){
 			res.status(400).json('user is not exist')
 		}else{
 			res.json(result);
 		}
 	})
}

const handleDeleteUser=(req,res)=>{
	const {username}=req.body;
	if(!username){
		return res.status(400).json('not username');
	}
	userInfo.findOneAndRemove({username:username}, (err,data)=>{
			if(err){
				res.status(400).json('err')
			}else{
				res.json("Success remove user:"+username);
			}
		});
}

const handleShowPlatforms=(req,res)=>{
	platformSchame.find({},function(err,result){
 		if(err){res.status(400).json('err')}
 		if(!result){
 			res.status(400).json('user is not exist')
 		}else{
 			res.json(result);
 		}
 	})
}

const handleDeletePlatform=(req,res)=>{
	const {platformName}=req.body;
	if(!platformName){
		return res.status(400).json('not platform');
	}
	platformSchame.findOneAndRemove({platformName:platformName}, (err,data)=>{
			if(err){
				res.status(400).json('err')
			}else{
				res.json("Success remove platform:"+platformName);
			}
		});
}

router.get("/admin/users",(req,res)=>{admin.handleShowUsers(req,res)})
router.post("/admin/users/delete",(req,res)=>{admin.handleDeleteUser(req,res)})
router.get("/admin/platforms",(req,res)=>{admin.handleShowPlatforms(req,res)})
router.post("/admin/platforms/delete",(req,res)=>{admin.handleDeletePlatform(req,res)})


module.exports=router;