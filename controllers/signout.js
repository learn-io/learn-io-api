var router = require('express').Router();


const handleSignout=(req,res)=>{
    req.session.username = undefined;
    req.session.isAdmin = false;
    res.json("Logged Out");
};

router.post("/",(req,res)=>{handleSignout(req,res)})

module.exports = router;