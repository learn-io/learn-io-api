var router = require('express').Router();
const mongoose=require('mongoose');

const platformSchema=require('../models/platform.js');

// Every time it creates a platform without module
const handlePlatform=(req,res)=>{
	const {platformName,image,description,owner}=req.body;
	if(!platformName){
		return res.status(400).json('incorrect form submission');
	}
 	const newPlatform=new platformSchema({
		platformName:platformName,
		image:image,
		description:description,
		owner:owner
	});
	newPlatform.save()
	.then(data=>{
		res.json(platformName)
	})
	.catch(err=>res.status(400).json('unable to create new platform'));
}
// return the platform
const handleGetPlatform=(req,res)=>{
	const {platformName}=req.params;
	if(!platformName){
		return res.status(400).json('incorrect form submission');
	}
	
	platformSchema.findOne({platformName:platformName},function(err,result){
 		if(err){res.status(400).json('err')}
 		if(!result){
 			res.status(401).json('platform is not exist')
 		}else{
			res.json(result);
 		}
 	})
}
// After the player add new module into platform
const handleNewModule=(req,res)=>{
	const {platformName,moduleName,moduleDescription,image,lockedby,unlocks,x,y,height,width}=req.body;
	if(!platformName){
		return res.status(400).json('incorrect form submission');
	}
	platformSchema.findOneAndUpdate({platformName:platformName},{$push:{modules:{			
			moduleName:moduleName,
			moduleDescription:moduleDescription,
			image:image,
			lockedby:lockedby,
			unlocks:unlocks,
			x:x,
			y:y,
			height:height,
			width:width
		}}},(err,data)=>{
		if(err){
			res.status(400).json('err')
		}else{
			if(!data){
				res.status(400).json('platform is not exist')
			}else{
				res.json("Success Update module");
			}
		}
	});
}
// return the specific module in platform
const handleGetPlatformModule=(req,res)=>{
	const {platformName,moduleName}=req.params;
	if(!platformName||!moduleName){
		return res.status(400).json('incorrect form submission');
	}
	platformSchema.findOne({platformName:platformName},function(err,result){
 		if(err){res.status(400).json('err')}
 		if(!result){
 			res.status(401).json('platform is not exist')
 		}else{
			const found=result.modules.find(element=>element.moduleName==moduleName);
			if(!found){
				res.status(401).json('module is not exist')
			}else{
				res.json(found);
			}
 		}
 	})
}

router.post("/",(req,res)=>{handlePlatform(req,res)})
router.get("/:platformName",(req,res)=>{handleGetPlatform(req,res)})
router.post("/newModule",(req,res)=>{handleNewModule(req,res)})
router.get("/:platformName/:moduleName",(req,res)=>{handleGetPlatformModule(req,res)})
module.exports=router;