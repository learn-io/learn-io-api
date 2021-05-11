var router = require('express').Router();
const { ObjectId } = require('bson');
const mongoose=require('mongoose');

const platformSchema=require('../models/platform.js');
const pageSchema=require('../models/page.js');

const handleNewPage=(req,res)=>{
	const {platformId,moduleId,pageName,widgets,rank,entry}=req.body;
    if(!platformId||!moduleId||!pageName){
		return res.status(400).json('incorrect form submission');
	}
	const newPage=new pageSchema({
		platformId:platformId,
		moduleId:moduleId,
		pageName:pageName,
		widgets:widgets,
		rank:rank,
		entry:entry
	});
	var pageId = newPage._id;
	// console.log("****NEW PAGE ID"+pageId);
	newPage.save()
	.then(data=>{
		res.status(200).json({pageId:pageId});
	})
	.catch(err=>res.status(400).json('unable to add new page'));
}

const handleGetPage=(req,res)=>{
	const {platformId,moduleId,pageId}=req.params;
    if(!platformId||!moduleId||!pageId){
		return res.status(400).json('incorrect form submission');
	}
	pageSchema.findOne({platformId:platformId,moduleId:moduleId,_id:ObjectId(pageId)},function(err,result){
 		if(err){res.status(400).json('err')}
 		if(!result){
 			res.status(401).json('page is not exist')
 		}else{
 			res.status(200).json(result);
 		}
 	})
}

const handleGetPages=(req,res)=>{ //@TODO need to get all pages for a specific platform's module using platform._id and module._id 
	const {platformId,moduleId}=req.params;
    if(!platformId||!moduleId){
		return res.status(400).json('incorrect form submission');
	}
	pageSchema.find({platformId:platformId,moduleId:moduleId},function(err,result){
 		if(err){res.status(400).json('err')}
 		if(!result){
 			res.status(401).json('page is not exist')
 		}else{
 			res.status(200).json(result);
 		}
 	})
}

const handleUpdatePage=(req,res)=>{
	const {platformId,moduleId,pageId,pageName,widgets,rank,entry}=req.body;
	if(!platformId||!moduleId||!pageId){
		return res.status(400).json('incorrect form submission');
	}
    let query = {}
	if(pageName)
	{
		query.pageName = pageName;
	}
	if(widgets)
	{
		query.widgets = widgets;
	}
	if(rank)
	{
		query.rank = rank;
	}
	if(!(entry===undefined)){
		query.entry = entry;
	}
	pageSchema.findOneAndUpdate({platformId:platformId,moduleId:moduleId,_id:ObjectId(pageId)},query,(err,result)=>{
		if(err){return res.status(400).json('err')}
		if(!result){
			res.status(404).json('page is not exist')
		}else{
			res.status(200).json("Success Update page");
		}
	});
}

const handleDeletePage=(req,res)=>{ //@TODO need to get all pages for a specific platform's module using platform._id and module._id 
	const {platformId,moduleId,pageId}=req.body;
    if(!platformId||!moduleId||!pageId){
		return res.status(400).json('incorrect form submission');
	}
 	pageSchema.findOneAndRemove({platformId:platformId,moduleId:moduleId,_id:pageId}, (err,data)=>{
        if(err){
            res.status(400).json('err')
        }else{
        	res.status(200).json("Success Delete page");
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
router.get("/:platformId/:moduleId/:pageId",(req,res)=>{handleGetPage(req,res)}) //@TODO :moduleName to :moduleId
router.post("/delete",(req,res)=>{handleDeletePage(req,res)}) //@TODO :moduleName to :moduleId
router.get("/:platformId/:moduleId", (req,res)=>{handleGetPages(req,res)}) //@TODO :moduleName to :moduleId
router.post("/update",(req,res)=>{handleUpdatePage(req,res)})
module.exports=router;