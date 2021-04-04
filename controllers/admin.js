
const handleShowUsers=(req,res,userInfo)=>{
	userInfo.find({},function(err,result){
 		if(err){res.status(400).json('err')}
 		if(!result){
 			res.status(400).json('user is not exist')
 		}else{
 			res.json(result);
 		}
 	})
}

const handleDeleteUser=(req,res,userInfo)=>{
	const {username}=req.body;
	if(!username){
		return res.status(400).json('not username');
	}
	userInfo.findOneAndRemove({username:username}, (err,data)=>{
			if(err){
				res.status(400).json('err')
			}else{
				res.json("Success remove user:"+username);
			}
		});
}

const handleShowPlatforms=(req,res,platformSchame)=>{
	platformSchame.find({},function(err,result){
 		if(err){res.status(400).json('err')}
 		if(!result){
 			res.status(400).json('user is not exist')
 		}else{
 			res.json(result);
 		}
 	})
}

const handleDeletePlatform=(req,res,platformSchame)=>{
	const {platformName}=req.body;
	if(!platformName){
		return res.status(400).json('not platform');
	}
	platformSchame.findOneAndRemove({platformName:platformName}, (err,data)=>{
			if(err){
				res.status(400).json('err')
			}else{
				res.json("Success remove platform:"+platformName);
			}
		});
}

module.exports={
	handleDeleteUser: handleDeleteUser,
	handleDeletePlatform:handleDeletePlatform,
	handleShowUsers:handleShowUsers,
	handleShowPlatforms:handleShowPlatforms
};