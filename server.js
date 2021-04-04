const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
// Models
const userInfo=require('./models/userInfo');
const platformSchame=require('./models/platform');
const pageSchame=require('./models/page');
const userPlatformInfoSchame=require('./models/userPlatformInfo');
const mediaSchame=require('./models/media');
// Controllers
const signin=require('./controllers/signin');
const register=require('./controllers/register');
const setting=require('./controllers/setting');
const admin=require('./controllers/admin');
const platform=require('./controllers/platform');

const url='mongodb://localhost:27017/learnio';
// const url='mongodb+srv://xinchen2:chenxin@cluster0.vib1g.mongodb.net/learnio?retryWrites=true&w=majority';
const app=express();
app.use(bodyParser.json());


const db=mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false,useCreateIndex: true },(error)=>{
	if(!error){
		console.log("Success");
	}else{
		console.log("Error");
	}
});
app.use(bodyParser.json());

app.post("/signin",(req,res)=>{signin.handleSignin(req,res,userInfo,bcrypt)})
app.post("/register",(req,res)=>{register.handleRegister(req,res,userInfo,bcrypt)})
app.post("/setting",(req,res)=>{setting.handleSetting(req,res,userInfo,bcrypt)})
app.post("/admin/users",(req,res)=>{admin.handleDeleteUser(req,res,userInfo)})
app.post("/admin/platforms",(req,res)=>{admin.handleDeletePlatform(req,res,platformSchame)})
app.post("/platform",(req,res)=>{platform.handlePlatform(req,res,platformSchame)})

app.listen(3000,()=>{
	console.log(`app is running on port 3000`);
})
