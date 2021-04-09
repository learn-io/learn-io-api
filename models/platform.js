const mongoose=require('mongoose')

const platformSchema=new mongoose.Schema({
	platformName:{type:String,required:true,unique:true},
	image:{type:String,default:""},
	description:{type:String,default:""},
	modules:[{
		platformId:{type:String},
		moduleName:{type:String},
		moduleDescription:{type:String},
		image:{type:String},
		lockedby:[],
		unlocks:[],
		x:{type:Number},
		y:{type:Number},
		height:{type:Number},
		width:{type:Number}
	}],
	owner:{type:String, required:true}
});
module.exports=mongoose.model('platform' ,platformSchema,'platform');