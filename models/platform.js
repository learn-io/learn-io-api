const mongoose=require('mongoose')

const platformSchema=new mongoose.Schema({
	name:{type:String},
	id:{type:Number,required:true},
	image:{type:String},
	description:{type:String},
	modules:[]
});
module.exports=mongoose.model('platform' ,platformSchema,'platform');