const express=require('express');
const mongoose=require('mongoose');

const session = require('express-session');
const MongoStore = require('connect-mongo');
var axios = require("axios");
const nodemailer=require('nodemailer');
const cors=require('cors');

// Models
//const pageSchame=require('./models/page');
//const userPlatformInfoSchame=require('./models/userPlatformInfo');
//const mediaSchame=require('./models/media');


// Controllers
const signin=require('./controllers/signin');
const signout=require('./controllers/signout');
const reset = require('./controllers/resetpass');
const register = require('./controllers/register');

const setting=require('./controllers/setting');

const admin=require('./controllers/admin');

const platform=require('./controllers/platform');
const widget=require('./controllers/widget');
const page=require('./controllers/page');

const search=require('./controllers/search');

const media=require('./controllers/media');

const userPlatform=require('./controllers/userPlatformInfo');


const app=express();

const mongo_local='mongodb://localhost:27017/learnio';
const mongo_dan="mongodb+srv://daniel:"+encodeURIComponent("K1jTFA$9$&nlgpa9Gu&FVioUj%0wQO")+"@learnio-dev1.s9z10.mongodb.net/learnio-dev?retryWrites=true&w=majority";
const mongo_xin='mongodb+srv://xinchen2:' + process.env.DB_PASS + '@cluster0.vib1g.mongodb.net/learnio?retryWrites=true&w=majority';
const mongo_akshay="mongodb+srv://supaak:supaak@cluster0.xb0gr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//TODO: production environment variables
let mongo_url;
var whitelist = ['http://localhost:3000', 'https://learn-io.herokuapp.com']
let cookieOpts;
if (process.env.NODE_ENV == 'production')
{
	cookieOpts = {
		httpOnly: false,
		secure: true,
		sameSite: 'none'
	};
	app.set('trust proxy', 1);
	app.use(cors(
		{ 
			credentials: true, 
			origin:function (origin, callback) {
				console.log(origin);
				if (!origin || whitelist.indexOf(origin) !== -1) {
					callback(null, true)
				} else {

					callback(new Error('Not allowed by CORS'))
				}
	  		},
			exposedHeaders: ["set-cookie"]
		}));
	mongo_url=mongo_xin;
}
else
{
	cookieOpts = {
		httpOnly: false,
		secure: false,
		sameSite: 'none'
	};
	app.use(cors());
	mongo_url=mongo_dan;
	// mongo_url=mongo_akshay;
	// mongo_url=mongo_local;
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
	cookie: cookieOpts,
  }));

const db=mongoose.connect(mongo_url,{useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false,useCreateIndex: true },(error)=>{
	if(!error){
		console.log("Connected to Mongo @ " + mongo_url);
		new Promise(resolve => setTimeout(resolve, 3000)).then(()=>{
		app.listen(process.env.PORT || 3000,()=>{
			console.log(`app is running on port ` + (process.env.PORT || 3000));
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
app.use("/reset", reset)

app.use("/setting", setting)

app.use("/admin", admin)

app.use("/platform", platform)
app.use("/widgets", widget)
app.use("/page", page)

app.use("/search", search)

app.use("/media",media)

app.use("/profile",userPlatform)
app.post("/send",(req,res)=>{
	const {newAccount,email,username,password}=req.body;
	let output;
	if(newAccount){
		output = `
	    	<p>Thank you for choosing our Learn-io App</p>
	      	<h3>This is your new account information</h3>
	      	<ul>  
	        	<li>Name: ${username}</li>
	        	<li>Company: ${password}</li>
	        	<li>Email: ${email}</li>
	      	</ul>
	    `;
	}else{
		output = `
	    	<p>We received your request to change your account information</p>
	      	<h3>This is the update of account information</h3>
	      	<ul>  
	        	<li>Name: ${username}</li>
	        	<li>Company: ${password}</li>
	        	<li>Email: ${email}</li>
	      	</ul>
	    `;
	}
	
	let transporter = nodemailer.createTransport({
      service:"outlook",
      auth: {
          	user: 'learn-io@outlook.com', // generated ethereal user
	      	pass: 'Learniotest' // generated ethereal password
      }
    });
	 let mailOptions = {
        from: '"Learn-io Team" <learn-io@outlook.com>', // sender address
        to: email, // list of receivers
        subject: 'Learn-io account information', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };
	transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).json("Email sent");
    });
})
app.get("/",(req,res)=>{res.status(200).json("Pong!");});


