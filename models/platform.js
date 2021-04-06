const mongoose=require('mongoose')

const platformSchema=new mongoose.Schema({
	name:{type:String,required:true,unique:true},
	id:{type:String,required:true,unique:true},
	image:{type:String,default:""},
	description:{type:String,default:""},
	modules:[{
		moduleName:{type:String},
		moduleDescription:{type:String},
		image:{type:String}
	}],
	owner:{type:String, required:true}
});
module.exports=mongoose.model('platform' ,platformSchema,'platform');