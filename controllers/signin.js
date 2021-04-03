// const userInfo=require('../models/userInfo');
const handleSignin=(req,res,userInfo,bcrypt)=>{
	const {username,password}=req.body;
	if(!username||!password){
		return res.status(400).json('incorrect form submission');
	}
	// userInfo
 //  		.find({username:username})
 //  		.exec()
 //  		.then((users)=>{
 //  			users
 //  				.forEach((user)=>{
 //  					const isValid=bcrypt.compareSync(password, user.password);
 //  					if(isValid){
 //  						res.json(user.username);
 //  					}else{
 //  						res.status(400).json('wrong credentials')
 //  					}
 //  				})
 //  		})
 //  		.catch(err=>res.status(400).json('wrong credentials'))
 	userInfo.findOne({username:username},function(err,result){
 		if(err){res.status(400).json('err')}
 		if(!result){
 			res.status(400).json('user is not exist')
 		}else{
 			const isValid=bcrypt.compareSync(password, result.password);
			if(isValid){
				res.json(result.username);
			}else{
				res.status(400).json('wrong password')
			}
 		}
 	})
}


module.exports={
	handleSignin:handleSignin
};