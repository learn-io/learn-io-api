const mongoose=require('mongoose')

const pageSchema=new mongoose.Schema({
	platformId:{type:String,required:true},
	platformName:{type:String,required:true}, //@TODO we can get rid of this field
	moduleName:{type:String,required:true}, //@TODO need to have moduleName be module._id
	pageName:{type:String,required:true},
	rank:{type:Number,default:0},
	entry:{type:Boolean,default:false},
	widgets:[]
});
module.exports=mongoose.model('page' ,pageSchema,'page');