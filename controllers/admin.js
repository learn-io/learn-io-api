var router = require('express').Router();
const mongoose=require('mongoose');

const platformSchema=require('../models/platform.js');
const userInfo=require('../models/userInfo.js');
const pageSchema=require('../models/page.js');
const userPlatformInfoSchema=require('../models/userPlatformInfo.js');

const handleDeleteUser=(req,res)=>{
	const {username}=req.body;
	if(!username){
		return res.status(400).json('not username');
	}
	userInfo.findOneAndRemove({username:username}, (err,data)=>{
			if(err){
				res.status(400).json('err')
			}else{
				// delete user platform information with this user
				userPlatformInfoSchema.deleteMany({username:username}, (err,data)=>{
	                if(err){
	                    res.status(400).json('err')
	                }
	            });
	            platformSchema.find({owner:username},(err,data)=>{
	            	data.forEach(d=>{
	            		pageSchema.deleteMany({platformId:d._id}, (err,data)=>{
			                if(err){
			                    res.status(400).json('err')
			                }
			            });
			            userPlatformInfoSchema.deleteMany({platformId:d._id}, (err,data)=>{
			                if(err){
			                    res.status(400).json('err')
			                }
			            });
	            	})
	            })
	            platformSchema.deleteMany({owner:username}, (err,data)=>{
	                if(err){
	                    res.status(400).json('err')
	                }
	            });
				res.status(200).json("Success remove user:"+username);
			}
		});
}

const handleDeletePlatform=(req,res)=>{
	const {_id}=req.body;
	if(!_id){
		return res.status(400).json('not platform');
	}

	platformSchema.findOneAndRemove({_id:_id}, (err,data)=>{
        if(err){
            res.status(400).json('err')
        }else{
            pageSchema.deleteMany({platformId:_id}, (err,data)=>{
                if(err){
                    res.status(400).json('err')
                }
            });
            userPlatformInfoSchema.deleteMany({platformId:_id}, (err,data)=>{
                if(err){
                    res.status(400).json('err')
                }
            });
            res.status(200).json("Success remove platform");
        }
    });

	// platformSchema.findOneAndRemove({_id:_id}, (err,data)=>{
	// 	if(err){
	// 		res.status(400).json('err')
	// 	}else{
	// 		res.status(200).json("Success remove platform");
	// 	}
	// });
	// pageSchema.findAndRemove({platformId:_id}, (err,data)=>{
	// 	if(err){
	// 		res.status(400).json('err')
	// 	}else{
	// 		res.status(200).json("Success remove page");
	// 	}
	// });
}

router.use("*", (req,res, next)=>{
	if (req.session.isAdmin)
		next();
	else
		res.status(401).json("Must be admin");

})

router.post("/users/delete",(req,res)=>{handleDeleteUser(req,res)})
router.post("/platforms/delete",(req,res)=>{handleDeletePlatform(req,res)})


module.exports=router;