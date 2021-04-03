const handleSetting=(req,res,userInfo,bcrypt)=>{
	const {username,email,dateOfBirth,oldPassword,newPassword,mute}=req.body;
	if(!username){
		return res.status(400).json('error');
	}
	if(!email&&!dateOfBirth&&!newPassword&&!mute){
		return res.status(400).json('nothing changed');
	}
	// change email address
	if(email){
		userInfo.findOneAndUpdate({username:username},{email:email},(err,data)=>{
			if(err){
				res.status(400).json('err')
			}else{
				res.json("Success Update Email");
			}
		});
	}
	// change date of birth
	if(dateOfBirth){
		userInfo.findOneAndUpdate({username:username},{dateOfBirth:dateOfBirth},(err,data)=>{
			if(err){
				res.status(400).json('err')
			}else{
				res.json("Success Update date of birth");
			}
		});
	}
	// change mute setting
	if(mute==true||mute==false){
		userInfo.findOneAndUpdate({username:username},{mute:mute},(err,data)=>{
			if(err){
				res.status(400).json('err')
			}else{
				res.json("Success mute setting");
			}
		});
	}
	// change password
	if(newPassword){
		userInfo.findOne({username:username},function(err,result){
	 		if(err){res.status(400).json('err')}
	 		if(!result){
	 			res.status(400).json('user is not exist')
	 		}else{
	 			const isValid=bcrypt.compareSync(oldPassword, result.password);
				if(isValid){
					const hash=bcrypt.hashSync(newPassword);
					userInfo.findOneAndUpdate({username:username},{password:hash},(err,data)=>{
						if(err){
							res.status(400).json('err')
						}else{
							res.json("Success update password");
						}
					});
				}else{
					res.status(400).json('wrong password')
				}
	 		}
	 	})
	}
}

module.exports={
	handleSetting: handleSetting
};