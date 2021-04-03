const mongoose=require('mongoose')

const mediaSchema=new mongoose.Schema({
	hash:{type:String,required:true},
	data:{type:String},
	extension:{type:String}
});
module.exports=mongoose.model('media' ,mediaSchema,'media');