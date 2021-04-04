// Use to remove users
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
	handleDeletePlatform:handleDeletePlatform
};