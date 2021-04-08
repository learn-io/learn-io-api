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
 			res.json(result);
 		}
 	})
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