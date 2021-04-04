const mongoose=require('mongoose')

const userInfoSchema=new mongoose.Schema({
	username:{type:String,required:true,unique:true},
	password:{type:String},
	email:{type:String},
	dateOfBirth:{type:String},
	admin:{type:Boolean,default:false},
	mute:{type:Boolean,default:false}
});
module.exports=mongoose.model('userInfo' ,userInfoSchema,'userInfo');