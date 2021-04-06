var router = require('express').Router();
const mongoose=require('mongoose');

const platformSchema=require('../models/platform.js');
const userInfo=require('../models/userInfo.js');

const handleSearchPlatforms=(req,res)=>{
    const {user, name, skip, count} = req.params;
    let query = {};
    if (user != 'all')
        query = { owner: new RegExp(user, 'i')}
    query.platformName = new RegExp(name, 'i');

    platformSchema.find(query, "platformName image description").limit(parseInt(count)).skip(parseInt(skip)).exec()
	.then(function(resp){
		res.status(200).json(resp);
	})
	.catch(function(err){
		res.status(400).json('Error Searching');
	})
}

const handleSearchUsers=(req,res)=>{
    const {user, skip, count} = req.params;
	query = {}
    query.username = new RegExp(user, 'i');

    userInfo.find(query, "username email dateOfBirth").limit(parseInt(count)).skip(parseInt(skip)).exec()
	.then(function(resp){
		console.log(resp);
		res.status(200).json(resp);
	})
	.catch(function(err){
		res.status(400).json(err);
	})
}


router.get("/platforms/:user/:name/:skip/:count",(req,res)=>{handleSearchPlatforms(req,res)})
router.get("/users/:user/:skip/:count",(req,res)=>{handleSearchUsers(req,res)})


module.exports=router;