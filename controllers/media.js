var router = require('express').Router();
const mongoose=require('mongoose');
const mediaSchema=require('../models/media.js');

var crypto = require('crypto');
const bcrypt = require('bcrypt');
const formData = require("express-form-data"); //this is right
const os = require("os");
const fs = require("fs");

const options = {
	uploadDir: os.tmpdir(),
	autoClean: true
};


// parse data with connect-multiparty. 
router.use(formData.parse(options));
// delete from the request all empty files (size == 0)
router.use(formData.format());

const handleMedia=(req,res)=>{
	const {file, extension}=req.body;
	if(!file||!extension){
		return res.status(400).json("Incorrect image upload");
	}
	let hash = crypto.createHash('sha256').update(file).update(extension).digest('base64');
	
	mediaSchema.exists({hash:hash}, function(err, doc) {
		if (err)
		{
			return res.status(400).json('unable to check media');
		}
		if (doc == true)
		{
			return res.status(200).json({hash:hash});
		}
		const newMedia=new mediaSchema({
			hash:hash,
			data:file,
			extension:extension
		});
		newMedia.save()
		.then(function(resp){
			res.status(200).json({hash:hash});
		})
		.catch(function(err){
			res.status(400).json('unable to create new media');
		});
	})
}

const handleGetMedia=(req,res)=>{
	const {hash}=req.params;
	if(!hash)
	{
		return res.status(400).json('not hash');
	}
 	mediaSchema.findOne({hash:decodeURIComponent(hash)},function(err,result){
 		if(err){
			 res.status(400).json('err')
		} else {
			if(!result){
				res.status(404).json('hash does not exist');
			}else{
				res.status(200).json(result);
			}
		}
 	})
}

router.post("*", (req,res, next)=>{
	if(req.session.username)
		next();
	else
		res.status(401).json("Must be logged in to post data");

})

router.post("/",(req,res)=>{handleMedia(req,res)})
router.get("/:hash",(req,res)=>{handleGetMedia(req,res)})
module.exports=router;