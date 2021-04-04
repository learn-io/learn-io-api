const express=require('express');
const mongoose=require('mongoose');

const session = require('express-session');
const MongoStore = require('connect-mongo');
// Models
//const pageSchame=require('./models/page');
//const userPlatformInfoSchame=require('./models/userPlatformInfo');
//const mediaSchame=require('./models/media');


// Controllers
const signin=require('./controllers/signin.js');
const register=require('./controllers/register.js');
const setting=require('./controllers/setting.js');
const admin=require('./controllers/admin.js');
const platform=require('./controllers/platform.js');

const mongo_local='mongodb://localhost:27017/learnio';
const mongo_dan='mongodb+srv://daniel:K1jTFA$9$&nlgpa9Gu&FVioUj%0wQO@learnio-dev1.s9z10.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongo_xin='mongodb+srv://xinchen2:' + process.env.DB_PASS + ' + @cluster0.vib1g.mongodb.net/learnio?retryWrites=true&w=majority';

//TODO: production environment variables
let mongo_url;
if (process.env.NODE_ENV == 'PROD')
{
	mongo_url=mongo_xin;
}
else
{
	mongo_url=mongo_dan;
}

const app=express();
app.use(express.json()); //bodyparser is deprecated


const db=mongoose.connect(mongo_url,{useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false,useCreateIndex: true },(error)=>{
	if(!error){
		console.log("Connected to Mongo");
	}else{
		console.log("Failed to Connect to Mongo");
	}
});

app.use(session({
	store: MongoStore.create({
	  mongoUrl: mongo_url,
	  ttl: 60 * 60, //expire token after one hour
	  touchAfter: 5 * 60, //only refresh token at most every 5 minutes 
	  crypto: {
		secret: 'TODO: move to env',
	  }
	})
  }));


app.use("/signin", signin)
app.use("/register", register)
app.use("/setting", setting)
app.use("/admin", admin)
app.use("/platform", platform)

app.listen(3000,()=>{
	console.log(`app is running on port 3000`);
	console.log(process.env.NODE_ENV);
})
