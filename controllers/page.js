var router = require('express').Router();
const mongoose=require('mongoose');

const platformSchema=require('../models/platform.js');
const pageSchema=require('../models/page.js');

const handleNewPage=(req,res)=>{
	const {platformName,moduleName,pageName,widgets}=req.body;
    if(!platformName||!moduleName||!pageName){
		return res.status(400).json('incorrect form submission');
	}
	const newPage=new pageSchema({
		platformName:platformName,
		moduleName:moduleName,
		pageName:pageName,
		widgets:widgets,
		rank:0
	});
	newPage.save()
	.then(data=>{
		res.status(200).json(pageName);
	})
	.catch(err=>res.status(400).json('unable add new page'));
}

const handleGetPage=(req,res)=>{
	const {platformName,moduleName,pageName}=req.params;
    if(!platformName||!moduleName||!pageName){
		return res.status(400).json('incorrect form submission');
	}
	pageSchema.findOne({platformName:platformName,moduleName:moduleName},function(err,result){
 		if(err){res.status(400).json('err')}
 		if(!result){
 			res.status(401).json('platform is not exist')
 		}else{
 			res.status(200).json(result);
 		}
 	})
}

const handleUpdatePage=(req,res)=>{
	const {platformName,moduleName,pageName,widgets}=req.params;
    let query = {}
	if (platformName)
	{
		query.platformName = platformName;
		//image:image,description:description,platformName:platformName}
	}
	if(moduleName)
	{
		query.moduleName = moduleName;
	}
	if(pageName)
	{
		query.pageName = pageName;
	}
	if(widgets)
	{
		query.widgets = widgets;
	}
	// pageSchema.findOneAndUpdate({_id:ObjectId(_id)},query,(err,result)=>{
	// 	if(err){return res.status(400).json('err')}
	// 	if(!result){
	// 		res.status(404).json('page is not exist')
	// 	}else{
	// 		res.status(200).json("Success Update page");
	// 	}
	// });

	pageSchema.findOneAndUpdate({username:username},{email:email},(err,data)=>{
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

router.post("*", (req,res,next)=>{
	if(req.session.username)
		next();
	else
		res.status(401).json("Must be logged in to post data");

})

router.post("/",(req,res)=>{handleNewPage(req,res)})
router.get("/:platformName/:moduleName/:pageName",(req,res)=>{handleGetPage(req,res)})
module.exports=router;