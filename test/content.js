var expect = require("chai").expect;
var axios = require("axios");
var bcrypt = require("bcrypt");
var crypto = require('crypto');
var fs = require("fs");

const FormData = require('form-data');

const helper=require('../controllers/testHelper');

const platform_url="http://localhost:3000/platform";
const widgets_url="http://localhost:3000/widgets";
const media_url="http://localhost:3000/media";
const register_url="http://localhost:3000/register";
const page_url="http://localhost:3000/page";

let cookie = "";

let platform = {
    name:"", 
    image:"",
    description:"",
    modules:[],
    owner:""
}

let imageData = "data:image/jpeg;base64,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";

//console.log("BASE64: ", imageData);

let imageExtension = "type/jpeg";

let imageHash = crypto.createHash('sha256').update(imageData).update(imageExtension).digest('base64');


let platformId = "";
let moduleId = "";
let pageId = "";
let pageId2 = "";

// .catch(function(error){
//     expect(error.response.status).to.equal(200,error.response.data);
// })

describe("Content Tests", function() {
    context('Setting Up User', function() {
        it("Register for Session", function(){
            return axios({
                method: 'post',
                url: register_url,
                data: {
                    username: "bob",
                    password: "pass1",
                    verifyPassword: "pass1", 
                    email: "email@email.email",
                    dateOfBirth: "11/9/1999" //TODO: formatting?
                }
            }).then(function(response){
                cookie = response.headers["set-cookie"][0];
                expect(response.status).to.equal(200, response.data);
            });
        });
    });
    context('Media Test', function() {
        it("Uploads media to the server", function(){ 
            let form = new FormData();
            form.append('file', imageData);
            form.append('extension', imageExtension);
            let headers = form.getHeaders();
            headers.Cookie = cookie;
            return axios({
                method: 'post',
                url: media_url,
                data:form,
                headers: headers
            }).then(function(response){
              	expect(response.status).to.equal(200, response.data);
                expect(response.data.hash).to.equal(imageHash);
            }).catch(function(err){
                expect(err.response).to.not.equal(undefined, err);
                expect(err.response.status).to.equal(200, err.response.data);
                expect(err.response.data.hash).to.equal(imageHash);
          });
        });
        it("Return media based on hash", function(){ 
            return axios({
                method: 'get',
                url: media_url+"/"+encodeURIComponent(imageHash)
            }).then(function(response){
              	expect(response.status).to.equal(200, response.data);
                delete response.data['_id'];
                delete response.data['__v'];
                expect(response.data).to.deep.equal({hash:imageHash, data:imageData, extension:imageExtension});
            }).catch(function(err){
                expect(err.response).to.not.equal(undefined, err);
                expect(err.response.status).to.equal(200, err.response.data);
                expect(err.response.data).to.deep.equal([{hash:imageHash, data:imageData, extension:imageExtension}]);
          });
        });
    });
    context('Setting Up', function() {
        //Need to put platform into db

        //Need to put pages into db

    });
    context("Platform Test", function() {
        it("Create platform", function(){ 
            return axios({
                method: 'post',
                url: platform_url,
                data:{
                    platformName:"All Those Obscure Berries",
                    image:"",
                    description:"In platform you learn about berries."
                },
                headers: { Cookie: cookie }
            }).then(function(response){
              	expect(response.status).to.equal(200, response.data);
                platformId=response.data.platformId;
            })
            // .catch(function(error){
            //     expect(error.response.status).to.equal(200, error.response.data);
            // });
        });
        it("Update platform about", function(){ 
            return axios({
                method: 'post',
                url: platform_url+"/about",
                data:{
                    _id:platformId,
                    platformName:"All About Obscure Berries",
                    image:"",
                    description:"In this platform you'll learn all about berries that you didn't even know were berries."
                },
                headers: { Cookie: cookie }
            }).then(function(response){
              	expect(response.status).to.equal(200, "Success Update Platform About");
            })
            // .catch(function(error){
            //     expect(error.response.status).to.equal(200, error.response);
            // });
        });

        it("Gets a platform's about page and display information", function(){
            return axios({
                method: 'get',
                url: platform_url+"/about/"+platformId,
            }).then(function(response){
              	expect(response.status).to.equal(200);
                expect(response.data).to.deep.equal({platformName:"All About Obscure Berries",image:"",description:"In this platform you'll learn all about berries that you didn't even know were berries."});
            })
            // .catch(function(error){
            //     expect(error.response.data).to.equal(200, error.response)
            // });
        });

        it("Get one platform by valid id", function(){ 
            return axios({
                method: 'get',
                url: platform_url+"/"+platformId,
            }).then(function(response){
              	expect(response.status).to.equal(200);
                expect(response.data).to.deep.equal({platformName:"All About Obscure Berries",image:"",description:"In this platform you'll learn all about berries that you didn't even know were berries.","modules":[],"owner":"bob"});
            });
        });
        it("Get one platform by invalid id", function(){ 
            return axios({
                method: 'get',
                url: platform_url+"/111111111111111111111111"
            }).then(function(response){
              	expect(response.status).to.equal(200, response.data);
            }).catch(function(error){
                expect(error.response.status).to.equal(404);
                expect(error.response.data).to.equal("platform does not exist");
            })
        });
        it("Create module", function(){ 
            return axios({
                method: "post",
                url: platform_url+"/newModule",
                data:{
                    _id:platformId,
                    moduleName:"What are Bootany Berries?",
                    moduleDescription:"In this Module you'll learn about the",
                    completionScore:"10",
                    image:imageHash,
                    lockedby:[],
                    unlocks:[],
                    x:50,
                    y:50,
                    height:350,
                    width:350
                },
                headers: { Cookie: cookie }
            }).then(function(response){
              	expect(response.status).to.equal(200, response.data);
                moduleId=response.data.moduleId;
            })
            // .catch(function(error){
            //     expect(error.response.status).to.equal(200,error.response.data);
            // })
        });
        it("Get platform's module", function(){ 
            return axios({
                method:"get",
                url: platform_url+"/"+platformId+"/"+encodeURIComponent("What are Bootany Berries?") //moduleId  //encodeURIComponent("What are Bootany Berries?")
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data).to.deep.equal({
                    _id:response.data._id,
                    completionScore: 10,
                    lockedby:[],
                    unlocks:[],
                    moduleName:"What are Bootany Berries?",
                    moduleDescription:"In this Module you'll learn about the",
                    image:imageHash,
                    x:50,
                    y:50,
                    height:350,
                    width:350
                });
            })
            // .catch(function(error){
            //     expect(error.response.status).to.equal(200,error.response.data);
            // })
        });
        it("Update platform's module", function(){
            return axios({
                method:"post",
                url: platform_url+"/update",
                data:{
                    _id:platformId,
                    moduleId:moduleId,
                    newModuleName:"What are Botany Berries?", 
                    moduleDescription:"In this Module you'll learn about the the wonderful and fascinating world of Botany Berries.",
                    completionScore:"5",
                    image:imageHash,
                    lockedby:[],
                    unlocks:[],
                    x:50,
                    y:50,
                    height:350,
                    width:350
                },
                headers: { Cookie: cookie }
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
            })
            .catch(function(error){
                expect(error.response).to.not.equal(undefined,error);
                expect(error.response.status).to.equal(200,error.response.data);
            })
        });
        it("Create a page for a platform's module", function(){ 
            return axios({
                method: 'post',
                url: page_url,
                data:{
                    platformId:platformId, 
                    moduleId:moduleId, 
                    pageName:"New Page",
                    widgets:[],
                    rank:1,
                    entry:true
                },
                headers: { Cookie: cookie }
            }).then(function(response){
              	expect(response.status).to.equal(200, response);
                pageId=response.data.pageId;
            })
            .catch(function(error){
                expect(error.response.status).to.equal(200, error.response.data);
            });
        });
        it("Get a specific page for a platform's module", function(){ 
            return axios({
                method: 'get',
                url: page_url+"/"+platformId+"/"+moduleId+"/"+pageId, //"/pageId",
            }).then(function(response){
              	expect(response.status).to.equal(200, response.data);
                delete response.data['__v'];
                expect(response.data).to.deep.equal({
                    _id:pageId,
                    platformId:platformId, 
                    moduleId:moduleId,
                    pageName:"New Page",
                    widgets:[],
                    entry:true,
                    rank:1
                });
            })
            // .catch(function(error){
            //     expect(error.response.status).to.equal(400);
            // });
        });
        it("Get all pages for a specific platform's module", function(){ 
            return axios({
                method: 'get',
                url: page_url+"/"+platformId+"/"+moduleId //encodeURIComponent("What are Botany Berries?")
            }).then(function(response){
              	expect(response.status).to.equal(200, response.data);
                delete response.data[0]['__v'];
                expect(response.data).to.deep.equal([{
                    _id:pageId,
                    platformId:platformId, 
                    moduleId:moduleId,
                    pageName:"New Page",
                    widgets:[],
                    entry:true,
                    rank:1
                }]);
            })
            // .catch(function(error){
            //     expect(error.response.status).to.equal(200, error.response.data);
            // });
        });
        
        /* New Tests */
        it("Create a page for a platform's module", function(){ 
            return axios({
                method: 'post',
                url: page_url,
                data:{
                    platformId:platformId, 
                    moduleId:moduleId, //@TODO need to have moduleName be module._id
                    pageName:"New Page 2",
                    widgets:[],
                    rank:1,
                    entry:true
                },
                headers: { Cookie: cookie }
            }).then(function(response){
              	expect(response.status).to.equal(200, response);
                pageId2=response.data.pageId;
            })
            .catch(function(error){
                expect(error.response.status).to.equal(200, error.response.data);
            });
        });

        it("Update a page for a platform's module", function(){ 
            return axios({
                method:"post",
                url:page_url+"/update",
                data:{
                    platformId:platformId, 
                    moduleId:moduleId,
                    pageId:pageId2,
                    pageName:"New Page 2 edited",
                    widgets:[
                        {
                            name:"widgets name",
                            x:10,
                            y:20,
                            height:30,
                            width:40,
                            internals: {
                                widgetFlavor:"Flashcard",
                                text:{
                                    front:"Front of flashcard",
                                    back:"Back of flashcard"
                                }
                            }
                        }
                    ],
                    rank:2,
                    entry:false
                },
                headers: { Cookie: cookie }
            })
        });

        it("Get an edited page for a platform's module", function(){ 
            return axios({
                method: 'get',
                url: page_url+"/"+platformId+"/"+moduleId+"/"+pageId2, //"/pageId",
            }).then(function(response){
              	expect(response.status).to.equal(200, response.data);
                delete response.data['__v'];
                expect(response.data).to.deep.equal({
                    _id:pageId2,
                    platformId:platformId, 
                    moduleId:moduleId,
                    pageName:"New Page 2 edited",
                    widgets:[
                        {
                            name:"widgets name",
                            x:10,
                            y:20,
                            height:30,
                            width:40,
                            internals: {
                                widgetFlavor:"Flashcard",
                                text:{
                                    front:"Front of flashcard",
                                    back:"Back of flashcard"
                                }
                            }
                        }      
                    ],
                    entry:false,
                    rank:2
                });
            })
            // .catch(function(error){
            //     expect(error.response.status).to.equal(400);
            // });
        });

    //     it("Get all pages for an updated platform's module", function(){ 
    //         return axios({
    //             method: 'get',
    //             url: page_url+"/"+platformId+"/"+moduleId //encodeURIComponent("What are Botany Berries?")
    //         }).then(function(response){
    //           	expect(response.status).to.equal(200, response.data);
    //             delete response.data[0]['__v'];
    //             delete response.data[1]['__v'];
    //             console.log(response.data);
    //             console.log(response.data[1].widgets)
    //             console.log(response.data[1].widgets[0].internals)
    //             expect(response.data).to.deep.equal([
    //                 {
    //                     _id:pageId2,
    //                     platformId:platformId, 
    //                     moduleId:moduleId,
    //                     pageName:"New Page 2 edited",
    //                     widgets:[
    //                         {
    //                             name:"widgets name",
    //                             x:10,
    //                             y:20,
    //                             height:30,
    //                             width:40,
    //                             internals: {
    //                                 widgetFlavor:"Flashcard",
    //                                 text:{
    //                                     front:"Front of flashcard",
    //                                     back:"Back of flashcard"
    //                                 }
    //                             }
    //                         }      
    //                     ],
    //                     entry:false,
    //                     rank:2
    //                 },
    //                 {
    //                     rank: 1,
    //                     entry: true,
    //                     widgets: [],
    //                     _id: pageId,
    //                     platformId: platformId,
    //                     moduleId: moduleId,
    //                     pageName: 'New Page'
    //                 }
    //             ]);
    //         })
    //         // .catch(function(error){
    //         //     expect(error.response.status).to.equal(200, error.response.data);
    //         // });
    //     });
    });
    context("Widget Test", function(){
        it("Get empty widget templates", function(){
            return axios({
                method: 'get',
                url: widgets_url,
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data.emptyWidgets).to.deep.equal([
                {
                    widgetFlavor:"Flashcard",
                    text:[
                        {
                            front:"Text",
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
                }]);
            }).catch(function(error){
                expect(error.response.status).to.equal(200, error.response.data);
            });
        });
    });
    context('Cleaning Up', function() {
        expect(process.env.NODE_ENV).to.not.equal('PROD');
        it("Clean up platform",function(){
            return helper.deletePlatform(platformId)
            .then(function(response){
                expect(response.status).to.equal(200, response.data);
            });
        });
        it("Deleting Registered User", function(){
            return helper.deleteUser("bob")
            .then(function(response){
                expect(response.status).to.equal(200, response.data);
            });
        });
    });
});