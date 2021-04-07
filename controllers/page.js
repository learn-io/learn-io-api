var router = require('express').Router();
const mongoose=require('mongoose');

const platformSchema=require('../models/platform.js');
const pageSchema=require('../models/page.js');
const userInfo=require('../models/userInfo.js');

const handleGetPage=(req,res)=>{
    const {platform, module, page} = req.params;
    let query = {};

    pageSchema.find(query, "")
}

const handleGetPages=(req,res)=>{
    const {platform, module} = req.params;
    let query = {};

    pageSchema.find(query, "")
}