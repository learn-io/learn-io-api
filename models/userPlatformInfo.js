const mongoose=require('mongoose')

const userPlatformInfoSchema=new mongoose.Schema({
	username:{type:String,required:true},
	platformId:{type:String,required:true},
	completeId:[],
	timeSpend:{type:Number,default:0},
	widgetsClicked:{type:Number,default:0},
	modulesCompleted:{type:Number,default:0},
	score:{type:Number,default:0},
	pageVisited:{type:Number,default:0},
	badges:[],
	ownPlatform:{type:Boolean}
});
module.exports=mongoose.model('userPlatformInfo' ,userPlatformInfoSchema,'userPlatformInfo');