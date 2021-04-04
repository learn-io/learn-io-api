const handlePlatform=(req,res,platformSchema)=>{
	const {platformName,image,description,modules}=req.body;
	if(!platformName){
		return res.status(400).json('incorrect form submission');
	}
 	const newPlatform=new platformSchema({
		platformName:platformName,
		image:image,
		description:description,
		modules:modules
	});
	newPlatform.save()
	.then(data=>{
		res.json(platformName)
	})
	.catch(err=>res.status(400).json('unable to create new platform'));
}

module.exports={
	handlePlatform: handlePlatform
};