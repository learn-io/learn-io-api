var router = require('express').Router();
const { ObjectId } = require('bson');
const mongoose=require('mongoose');

const userPlatformInfoSchema=require('../models/userPlatformInfo.js');
const platformSchema=require('../models/platform.js');

const handleUserPlay=(req,res)=>{ 
	const {platformId}=req.body;
	const username = req.session.username;
	if(!platformId){
		return res.status(400).json('incorrect form submission');
	}
	if(!username){
		return res.status(200).json("guest");
	}
	var platformOwner=false;

	userPlatformInfoSchema.findOne({"platformId":ObjectId(platformId), "username":username},function(err,result){
		if (err){
			return res.status(400).json(err);
		}
		if(!result){
			platformSchema.findOne({"_id":ObjectId(platformId)},function(err,result){
				if(err){res.status(400).json(err)}
				if(!result){
					return res.status(404).json('platform is not exist');
				}else{
					if(result.owner==username){
						platformOwner=true;
					}
					const newPlatformUser=new userPlatformInfoSchema({
						username:username,
						platformId:platformId,
						ownPlatform:platformOwner
					});
					newPlatformUser.save()
					.then(data=>{
						return res.status(200).json(data);
					})
					.catch(err=>{res.status(400).json('unable to create new platform user')});
				}
			})
		}else{
		   return res.status(200).json(result);
		}
	});
}

const handleSearchUserPlatformInfo=(req,res)=>{
    const {user, skip, count} = req.params;
	if (!user)
	{
		return res.status(400).json("No User Given")
	}

	if (user != req.session.username && req.session.isAdmin === false)
		return res.status(401).json('Must be the user');

	if (!skip || !count)
	{
		return res.status(400).json("Invalid skip and count")
	}
	let query = {}
	query.username = user;

	userPlatformInfoSchema.find(query, "platformId completeId timeSpend widgetsClicked modulesCompleted pageVisited badges").limit(parseInt(count)).skip(parseInt(skip)).exec()
    // platformSchema.find(query).limit(parseInt(count)).skip(parseInt(skip)).exec()
	.then(function(resp){
		res.status(200).json({resp});
	})
	.catch(function(err){
		res.status(400).json(err);
	})
}
const handleUpdateUserPlatformInfo=(req,res)=>{
    const {platformId, completeId,timeSpend,widgetsClicked,modulesCompleted,pageVisited,badges} = req.body;
	query = {}
	const username = req.session.username;
	if(!username||!platformId){
		return res.status(400).json('incorrect form submission');
	}
	if(completeId){
		query.completeId=completeId;
	}
    if(timeSpend){
		query.timeSpend=timeSpend;
	}
	if(widgetsClicked){
		query.widgetsClicked=widgetsClicked;
	}
	if(modulesCompleted){
		query.modulesCompleted=modulesCompleted;
	}
	if(pageVisited){
		query.pageVisited=pageVisited;
	}
	if(badges){
		query.badges=badges;
	}

 	userPlatformInfoSchema.findOneAndUpdate({username:username, platformId:platformId},query,(err,result)=>{
		if(err){return res.status(400).json('err')}
		if(!result){
			res.status(404).json('user platform information is not exist');
		}else{
			res.status(200).json("Success update user platform information");
		}
	});
}

router.post("*", (req,res,next)=>{
	if(req.session.username)
		next();
	else
		res.status(401).json("Must be logged in to post data");

})


router.post("/play",(req,res)=>{handleUserPlay(req,res)})
router.get("/stats/:user/:skip/:count", (req,res)=>{handleSearchUserPlatformInfo(req, res)});
router.post("/update",(req,res)=>{handleUpdateUserPlatformInfo(req,res)})
module.exports=router;