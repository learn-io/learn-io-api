const express=require('express');
const mongoose=require('mongoose');

const session = require('express-session');
const MongoStore = require('connect-mongo');
var axios = require("axios");

const cors=require('cors');

// Models
//const pageSchame=require('./models/page');
//const userPlatformInfoSchame=require('./models/userPlatformInfo');
//const mediaSchame=require('./models/media');


// Controllers
const signin=require('./controllers/signin');
const signout=require('./controllers/signout');
const register=require('./controllers/register');
const setting=require('./controllers/setting');
const admin=require('./controllers/admin');
const platform=require('./controllers/platform');
const search=require('./controllers/search');
const media=require('./controllers/media');
const widget=require('./controllers/widget');
const page=require('./controllers/page');
const userPlatform=require('./controllers/userPlatformInfo');

const app=express();

const mongo_local='mongodb://localhost:27017/learnio';
const mongo_dan="mongodb+srv://daniel:"+encodeURIComponent("K1jTFA$9$&nlgpa9Gu&FVioUj%0wQO")+"@learnio-dev1.s9z10.mongodb.net/learnio-dev?retryWrites=true&w=majority";
const mongo_xin='mongodb+srv://xinchen2:' + process.env.DB_PASS + ' + @cluster0.vib1g.mongodb.net/learnio?retryWrites=true&w=majority';
const mongo_akshay="mongodb+srv://supaak:supaak@cluster0.xb0gr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//TODO: production environment variables
let mongo_url;

if (process.env.NODE_ENV == 'PROD')
{
	app.use(cors({ credentials: true, origin:'learn-io-api.herokuapp.com'}));
	mongo_url=mongo_xin;
}
else
{
	mongo_url=mongo_dan;
	// mongo_url=mongo_akshay;
}

app.use(express.json()); //bodyparser is deprecated

app.use(session({
	store: MongoStore.create({
	  mongoUrl: mongo_url,
	  ttl: 60 * 60, //expire token after one hour
	  touchAfter: 5 * 60, //only refresh token at most every 5 minutes 
	}),
	secret: 'TODO: move to env',
  	resave: false,
  	saveUninitialized: true,
	cookie: {
		httpOnly: false,
		secure: false
	},
  }));

const db=mongoose.connect(mongo_url,{useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false,useCreateIndex: true },(error)=>{
	if(!error){
		console.log("Connected to Mongo @ " + mongo_url);
		new Promise(resolve => setTimeout(resolve, 3000)).then(()=>{
		app.listen(process.env.PORT || 3000,()=>{
			console.log(`app is running on port ` + process.env.PORT || 3000);
		});});
		
	}else{
		console.log("Failed to Connect to Mongo @ " + mongo_url);
		console.log(error.name);
		console.log(error.message);
	}
});



app.use("/signin", signin)
app.use("/signout", signout)
app.use("/register", register)
app.use("/setting", setting)
app.use("/admin", admin)
app.use("/platform", platform)
app.use("/search", search)
app.use("/media",media)
app.use("/widgets", widget)
app.use("/page", page)
app.use("/play",userPlatform)
app.get("/",(req,res)=>{res.json("Pong!");});


