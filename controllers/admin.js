// Use to remove users
const handleAdmin=(req,res,userInfo)=>{
	const {username}=req.body;
	if(!username){
		return res.status(400).json('not username');
	}
	userInfo.findOneAndRemove({username:username}, (err,data)=>{
			if(err){
				res.status(400).json('err')
			}else{
				res.json("Success remove "+username);
			}
		});
}

module.exports={
	handleAdmin: handleAdmin
};