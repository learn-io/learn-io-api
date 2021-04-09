var router = require('express').Router();
const { ObjectId } = require('bson');
const mongoose=require('mongoose');

const platformSchema=require('../models/platform.js');

// Every time it creates a platform without module
const handlePlatform=(req,res)=>{
	const {platformName,image,description}=req.body;
	if(!platformName){
		return res.status(400).json('incorrect form submission');
	}
 	const newPlatform=new platformSchema({
		platformName:platformName,
		image:image,
		description:description,
		owner:req.session.username,
		modules:[]
	});
	// console.log("****NEW PLATFORM ID"+newPlatform._id);
	var platformId=newPlatform._id;
	newPlatform.save()
	.then(data=>{
		res.status(200).json({platformId:platformId}) ////platformId:newPlatform._id
	})
	.catch(err=>res.status(400).json('unable to create new platform'));
}
// return the platform
const handleGetPlatform=(req,res)=>{
	const {_id}=req.params;
	if(!_id){
		return res.status(400).json('incorrect form submission');
	}
	
	platformSchema.findOne({"_id":ObjectId(_id)},function(err,result){
 		if(err){return res.status(400).json('err')}
 		if(result){
			res.status(200).json({"platformName":result.platformName,"image":"","description":result.description,"modules":result.modules});
 		}else{
			res.status(404).json('platform does not exist')
 		}
 	})
}
// After the player add new module into platform
const handleNewModule=(req,res)=>{
	const {_id,moduleName,moduleDescription,image,lockedby,unlocks,x,y,height,width}=req.body;
	if(!_id){
		return res.status(400).json('incorrect form submission');
	}
	platformSchema.findOneAndUpdate({_id:ObjectId(_id), owner:req.session.username},{$push:{modules:{			
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
			return res.status(400).json('err')
		}else{
			if(!data){
				res.status(400).json('platform is not exist')
			}else{
				res.status(200).json("Success Update module");
			}
		}
	});
}
// return the specific module in platform
const handleGetPlatformModule=(req,res)=>{
	const {_id,moduleName}=req.params;
	if(!_id||!moduleName){
		return res.status(400).json('incorrect form submission');
	}
	platformSchema.findOne({_id:ObjectId(_id)},function(err,result){
 		if(err){return res.status(400).json('err')}
 		if(!result){
 			res.status(404).json('platform is not exist')
 		}else{
			const found=result.modules.find(element=>element.moduleName==moduleName);
			if(!found){
				res.status(404).json('module is not exist')
			}else{
				res.status(200).json(found);
			}
 		}
 	})
}

const handleUpdatePlatformModule=(req,res)=>{
	const {_id,oldModuleName,newModuleName, moduleDescription,image,lockedby,unlocks,x,y,height,width}=req.body;
	if(!_id||!moduleName){
		return res.status(400).json('incorrect form submission');
	}
	platformSchema.findOne({_id:ObjectId(_id)},function(err,result){
 		if(err){return res.status(400).json('err')}
 		if(!result){
 			res.status(404).json('platform is not exist')
 		}else{
			const found=result.modules.find(element=>element.moduleName==oldModuleName);
			if(!found){
				res.status(404).json('module is not exist');
			}else{
				if(newModuleName){
					found.moduleName=newModuleName;
				}
				if(moduleDescription){
					found.moduleDescription=moduleDescription;
				}
				if(image){
					found.image=image;
				}
				if(lockedby){
					found.lockedby=lockedby;
				}
				if(unlocks){
					found.unlocks=unlocks;
				}
				if(x){
					found.x=x;
				}
				if(y){
					found.y=y;
				}
				if(height){
					found.height=height;
				}
				if(width){
					found.width=width;
				}
				result.save();
				res.status(200).json('module updated');
			}
 		}
 	})
}

const handleUpdatePlatformAbout=(req,res)=>{
	const {_id,platformName,image,description}=req.body;
	if(!_id){
		return res.status(400).json('platform id is required');
	}
	if(!image&&!description&&!platformName){
		return res.status(400).json('nothing changed');
	}
	let query = {}
	if (image)
	{
		query.image = image;
		//image:image,description:description,platformName:platformName}
	}
	if(description)
	{
		query.description = description;
	}
	if(platformName)
	{
		query.platformName = platformName;
	}
	
	platformSchema.findOneAndUpdate({_id:ObjectId(_id), owner:req.session.username},query,(err,result)=>{
		if(err){return res.status(400).json('err')}
		if(!result){
			res.status(404).json('platform is not exist')
		}else{
			res.status(200).json("Success Update Platform About");
		}
	});
}

const handleGetPlatformAbout=(req,res)=>{
	const {_id}=req.params;
	if(!_id){
		return res.status(400).json('incorrect form submission');
	}
	
	platformSchema.findOne({_id:ObjectId(_id)},function(err,result){
 		if(err){return res.status(400).json('err')}
 		if(!result){
 			res.status(404).json('platform does not exist')
 		}else{
			res.status(200).json({
				platformName:result.platformName,
				image:result.image,
				description:result.description
			});
 		}
 	})
}

router.post("*", (req,res,next)=>{
	if(req.session.username)
		next();
	else
		res.status(401).json("Must be logged in to post data");

})


router.post("/",(req,res)=>{handlePlatform(req,res)})
router.get("/:_id",(req,res)=>{handleGetPlatform(req,res)})
router.post("/newModule",(req,res)=>{handleNewModule(req,res)})
router.post("/about",(req,res)=>{handleUpdatePlatformAbout(req,res)})
router.get("/about/:_id",(req,res)=>{handleGetPlatformAbout(req,res)})
router.get("/:platformName/:moduleName",(req,res)=>{handleGetPlatformModule(req,res)})
router.post("/update",(req,res)=>{handleUpdatePlatformModule(req,res)})
module.exports=router;