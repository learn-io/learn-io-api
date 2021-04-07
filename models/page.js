const mongoose=require('mongoose')

const pageSchema=new mongoose.Schema({
	platform:{type:String,required:true},
	module:{type:Number,required:true},
	name:{type:String},
	id:{type:Number,required:true},
	rank:{type:Number,defalut:0},
	entry:{type:Boolean},
	widgets:[]
});
module.exports=mongoose.model('page' ,pageSchema,'page');