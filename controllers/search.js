var router = require('express').Router();
const mongoose=require('mongoose');

const platformSchema=require('../models/platform.js');
const userInfo=require('../models/userInfo.js');

const handleSearchPlatforms=(req,res)=>{
    const {user, platforms, skip, count} = req.params;
    let query = {};
    if (user != 'all')
        query = { owner: new RegExp(user, 'i')}
    query.platformName = new RegExp(platforms, 'i');

    platformSchema.find(query, "platformName image description").limit(count).skip(skip).exec()
	.then(function(resp){
		res.status(200).json(resp);
	})
	.catch(function(err){
		res.status(400).json(err);
	})
	res.status(400).json('Unknown Error');
}

const handleSearchUsers=(req,res)=>{
    const {user, skip, count} = req.params;
	query = {}
    query.owner = new RegExp(user, 'i');

    platformSchema.find(query, "username email dateOfBirth").limit(count).skip(skip).exec()
	.then(function(resp){
		res.status(200).json(resp);
	})
	.catch(function(err){
		res.status(400).json(err);
	})
	res.status(400).json('Unknown Error');
}


router.get("/platforms/:user/:name/:start/:count",(req,res)=>{handleSearchPlatforms(req,res)})
router.get("/users/:user/:start/:count",(req,res)=>{handleSearchUsers(req,res)})


module.exports=router;