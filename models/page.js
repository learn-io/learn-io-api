const mongoose=require('mongoose')

const pageSchema=new mongoose.Schema({
	platformName:{type:String,required:true},
	moduleName:{type:String,required:true},
	pageName:{type:String,required:true},
	rank:{type:Number,defalut:0},
	entry:{type:Boolean,defalut:false},
	widgets:[]
});
module.exports=mongoose.model('page' ,pageSchema,'page');