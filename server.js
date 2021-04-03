const mongoose=require('mongoose');
const express=require('express');
// const router=express.Router();
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const userInfo=require('./models/userInfo');
const signin=require('./controllers/signin');
const register=require('./controllers/register');
const url='mongodb://localhost:27017/learnio';
// const url='mongodb+srv://xinchen2:chenxin@cluster0.vib1g.mongodb.net/learnio?retryWrites=true&w=majority';
const dbName='learnio';
const app=express();
app.use(bodyParser.json());


const db=mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true},(error)=>{
	if(!error){
		console.log("Success");
	}else{
		console.log("Error");
	}
});
app.use(bodyParser.json());

// app.post("/signin", function(req, res) {
//   // var user=mongoose.find
//   // var Model=mongoose.model('userInfo' ,userInfo);
// 	const {username,password}=req.body;
// 	if(!username||!password){
// 		return res.status(400).json('incorrect form submission');
// 	}
// 	userInfo
//   		.find({username:username})
//   		.exec()
//   		.then((users)=>{
//   			users
//   				.forEach((user)=>{
//   					if(user.password==password){
//   						res.json(user);
//   					}else{
//   						res.status(400).json('wrong credentials')
//   					}
//   				})
//   		})
//   		.catch((err)=>{
//   			throw err;
//   		})
// });
app.post("/signin",(req,res)=>{signin.handleSignin(req,res,userInfo,bcrypt)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,userInfo,bcrypt)})
// app.post('/register',(req,res)=>{
// 	const newUser=new userInfo({
// 		username:request.body.username,
// 		password:request.body.password,
// 		email:request.body.email,
// 		dateOfBirth:request.body.dateOfBirth
// 	});
// 	newUser.save()
// 	.then(data=>{
// 		res.json(data)
// 	})
// 	.catch(error=>{
// 		res.json(error)
// 	})
// })
app.listen(3000,()=>{
	console.log(`app is running on port 3000`);
})
