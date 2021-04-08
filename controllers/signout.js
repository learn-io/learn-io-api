var router = require('express').Router();


const handleSignout=(req,res)=>{
    if (req.session.username == undefined)
        return res.status(401).json("Not Logged In");
    req.session.username = undefined;
    req.session.isAdmin = false;
    res.status(200).json("Logged Out");
};

router.post("/",(req,res)=>{handleSignout(req,res)})

module.exports = router;