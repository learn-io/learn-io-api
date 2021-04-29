const mongoose=require('mongoose')

const platformSchema=new mongoose.Schema({
	platformName:{type:String,required:true,unique:true},
	image:{type:String,default:""},
	description:{type:String,default:""},
	modules:[{
		moduleName:{type:String,required:true},
		moduleDescription:{type:String,required:true},
		image:{type:String,default:""},
		completionScore:{type:Number,default:10},
		lockedby:[],
		unlocks:[],
		x:{type:Number,default:0},
		y:{type:Number,default:0},
		height:{type:Number, default:2},
		width:{type:Number, default:2}
	}],
	owner:{type:String, required:true}
});
module.exports=mongoose.model('platform' ,platformSchema,'platform');