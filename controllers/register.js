// const userInfo=require('../models/userInfo');
const handleRegister=(req,res,userInfo,bcrypt)=>{
	const {username,password,email,dateOfBirth}=req.body;
	if(!username||!password||!email||!dateOfBirth){
		return res.status(400).json('incorrect form submission');
	}
	const hash=bcrypt.hashSync(password);
	const newUser=new userInfo({
		username:username,
		password:hash,
		email:email,
		dateOfBirth:dateOfBirth
	});
	newUser.save()
	.then(data=>{
		res.json(username)
	})
	.catch(err=>res.status(400).json('unable to register'));
}

module.exports={
	handleRegister: handleRegister
};