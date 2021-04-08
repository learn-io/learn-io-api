var router = require('express').Router();
const mongoose=require('mongoose');

var emptyWidgets = [
{
    widgetFlavor:"Flashcard",
    text:[
        {
            front:"Text"
        },{
            back:"Text"
        }
    ]
},{
    widgetFlavor:"Image",
    hash:""
},{
    widgetFlavor:"Sound",
    hash:"" 
},{
    widgetFlavor:"MultipleChoice",
    options:[
        {option:"Text",isCorrect:true},
        {option:"Text",isCorrect:false},
        {option:"Text",isCorrect:false},
        {option:"Text",isCorrect:false}                            
    ],
    buttonText:"Text",
    rightAnswer:{
        actionType:"S",
        target:""
    },
    wrongAnswer:{
        actionType:"P",
        target:""
    }
},{
    widgetFlavor:"Matching",
    options:[
        {
            left:"Text",
            right:"Text"
        }
    ],
    buttonText:"Text",
    rightAnswer:{
        actionType:"S",
        target:""
    },
    wrongAnswer:{
        actionType:"P",
        target:""
    }
},{
    widgetFlavor:"Snacksnake",
    options:[{
        rightImage:"",
        wrongImage:""
    }],
    rightAnswer:{
        actionType:"S",
        target:""
    }
},{
    widgetFlavor:"Quicktime",
    options:[
        {text:"Text",actionType:"P",target:""},
        {text:"Text",actionType:"P",target:""},
        {text:"Text",actionType:"P",target:""},
        {text:"Text",actionType:"P",target:""}
    ],
    timeout:{
        actionType:"P",
        target:"",
        seconds:3
    },
    startText:"Start Text",
    question:"Question Text"
},{
    widgetFlavor:"ImageButton",
    hash:"",
    click:{
        actionType:"P",
        target:""
    }
},{
    widgetFlavor:"TextButton",
    text:"",
    click:{
        actionType:"P",
        target:""
    }
}];

const handleGetEmptyWidgets=(req,res)=>{
    
}

router.get("/widgets",(req,res)=>{handleGetEmptyWidgets(req,res)})