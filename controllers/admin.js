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
 			res.status(200).json(result);
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
				res.status(200).json("Success remove user:"+username);
			}
		});
}

const handleShowPlatforms=(req,res)=>{
	platformSchame.find({},function(err,result){
 		if(err){res.status(400).json('err')}
 		if(!result){
 			res.status(400).json('user is not exist')
 		}else{
 			res.status(200).json(result);
 		}
 	})
}

const handleDeletePlatform=(req,res)=>{
	const {_id}=req.body;
	if(!_id){
		return res.status(400).json('not platform');
	}
	platformSchame.findOneAndRemove({_id:ObjectId(_id)}, (err,data)=>{
		if(err){
			res.status(400).json('err')
		}else{
			res.status(200).json("Success remove platform");
		}
	});
}

router.use("*", (req,res, next)=>{
	if (req.session.isAdmin)
		next();
	else
		res.status(401).json("Must be admin");

})

router.get("/users",(req,res)=>{handleShowUsers(req,res)})
router.post("/users/delete",(req,res)=>{handleDeleteUser(req,res)})
router.get("/platforms",(req,res)=>{handleShowPlatforms(req,res)})
router.post("/platforms/delete",(req,res)=>{handleDeletePlatform(req,res)})


module.exports=router;