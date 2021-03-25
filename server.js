const MongoClient = require('mongodb').MongoClient;
const express=require('express');

const url='mongodb://localhost:27017';
const dbName='learnio';
const app=express();

MongoClient.connect(url,function(err,db){
	if(err) throw err;
	var dbo=db.db(dbName);
	dbo.collection("userInfo").find().toArray(function(err,result){
		if(err) throw err;
		console.log(result);
		db.close();
	})
});

