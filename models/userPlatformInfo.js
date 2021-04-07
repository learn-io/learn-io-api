const mongoose=require('mongoose')

const userPlatformInfoSchema=new mongoose.Schema({
	username:{type:String,required:true},
	platformName:{type:String,required:true},
	completeId:[],
	timeSpend:{type:Number,defalut:0},
	widgetsClicked:{type:Number,defalut:0},
	modulesCompleted:{type:Number,defalut:0},
	pageVisited:{type:Number,defalut:0},
	badges:[],
	ownPlatform:{type:Boolean}
});
module.exports=mongoose.model('userPlatformInfo' ,userPlatformInfoSchema,'userPlatformInfo');