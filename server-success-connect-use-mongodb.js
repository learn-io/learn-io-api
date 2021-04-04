const MongoClient = require('mongodb').MongoClient;
const express=require('express');
const bodyParser=require('body-parser');

// const url='mongodb://localhost:27017';
const url='mongodb+srv://xinchen2:chenxin@cluster0.vib1g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName='learnio';
const app=express();
var db;

app.use(bodyParser.json());
MongoClient.connect(url,{useUnifiedTopology: true}, function(err, database) {
  if(err) throw err;

  db = database.db(dbName);

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});

app.get("/", function(req, res) {
  db.collection("userInfo").find({}, function(err, docs) {
    docs.each(function(err, doc) {
      if(doc) {
        console.log(doc);
      }
      else {
        res.end();
      }
    });
  });
});
app.post('/signin',(req,res)=>{
	const cursor=db.collection('userInfo').find().toArray()
		.then(result=>{
			console.log(result)
		})
});