var router = require('express').Router();
const mongoose=require('mongoose');

const platformSchema=require('../models/platform.js');

const handlePlatform=(req,res)=>{
	const {platformName,image,description,modules}=req.body;
	if(!platformName){
		return res.status(400).json('incorrect form submission');
	}
 	const newPlatform=new platformSchema({
		platformName:platformName,
		image:image,
		description:description,
		modules:modules
	});
	newPlatform.save()
	.then(data=>{
		res.json(platformName)
	})
	.catch(err=>res.status(400).json('unable to create new platform'));
}

router.post("/",(req,res)=>{handlePlatform(req,res)})

module.exports=router;