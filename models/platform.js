const mongoose=require('mongoose')

const platformSchema=new mongoose.Schema({
	platformName:{type:String,required:true,unique:true},
	image:{type:String,default:""},
	description:{type:String,default:""},
	owner:{type:String, required:true},
	modules:[{
		pageName:{type:String},
		pageDescription:{type:String},
		image:{type:String}
	}]
});
module.exports=mongoose.model('platform' ,platformSchema,'platform');