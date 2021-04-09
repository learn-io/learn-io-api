const mongoose=require('mongoose')

const pageSchema=new mongoose.Schema({
	platformId:{type:String,required:true},
	moduleId:{type:String,required:true},
	pageName:{type:String,required:true},
	rank:{type:Number,default:0},
	entry:{type:Boolean,default:false},
	widgets:[]
});
module.exports=mongoose.model('page' ,pageSchema,'page');