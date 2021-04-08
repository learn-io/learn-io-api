var router = require('express').Router();
const mongoose=require('mongoose');
const mediaSchema=require('../models/media.js');

const bcrypt = require('bcrypt-nodejs');
const { response } = require('express');

const handleMedia=(req,res)=>{
	const {data,extension}=req.body;
	if(!data||!extension){
		res.status(400).json("Incorrect image upload");
	}
	
 	const newMedia=new mediaSchema({
		hash:bcrypt.hashSync(data),
		data:data,
		extension:extension
	});
	newMedia.save()
	.then(function(resp){
		res.status(200).json(resp);
	})
	.catch(function(err){
		res.status(400).json('unable to create new media');
	});
}

const handleGetMedia=(req,res)=>{
	const {hash}=req.params;
	if(!hash)
	{
		res.status(400).json('not hash');
	}
 	mediaSchema.findOne({hash:hash},function(err,result){
 		if(err){
			 res.status(400).json('err')
		} else {
			if(!result){
				res.status(401).json('hash does not exist');
			}else{
				res.status(200).json(result);
			}
		}
 	})
}
router.post("/",(req,res)=>{handleMedia(req,res)})
router.get("/:hash",(req,res)=>{handleGetMedia(req,res)})
module.exports=router;