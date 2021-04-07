var router = require('express').Router();
const mongoose=require('mongoose');
const mediaSchema=require('../models/media.js');

const handleMedia=(req,res)=>{
	const {hash,data,extension}=req.body;
	
 	const newMedia=new mediaSchema({
		hash:hash,
		data:data,
		extension:extension
	});
	newMedia.save()
	.then(data=>{
		res.json(hash)
	})
	.catch(err=>res.status(400).json('unable to create new media'));
}

const handleGetMedia=(req,res)=>{
	const {hash}=req.params;
	if(!hash)
	{
		return res.status(400).json('not hash');
	}
 	mediaSchema.findOne({hash:hash},function(err,result){
 		if(err){res.status(400).json('err')}
 		if(!result){
 			res.status(401).json('hash is not exist')
 		}else{
			res.json(result);
 		}
 	})
}
router.post("/",(req,res)=>{handleMedia(req,res)})
router.get("/:hash",(req,res)=>{handleGetMedia(req,res)})
module.exports=router;