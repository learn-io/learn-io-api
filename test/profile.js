var expect = require("chai").expect;
var axios = require("axios");

const platform_url="http://localhost:3000/platform";
const profile_url="http://localhost:3000/profile";
const register_url="http://localhost:3000/register";
const helper=require('../controllers/testHelper');

let cookie = "";

let platformId="";

describe("Profile Tests", function(){
    context('Setting Up', function() {
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
        it("Create platform", function(){ 
            return axios({
                method: 'post',
                url: platform_url,
                data:{
                    platformName:"All DEM Obscure Berries",
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
    });
    
    context("Retrieve Platform Info", function(){
        it("Set one user's platform info", function(){ // Shouldn't handleUserPlay also have fields for completedId, timeSpend, widgetsClicked, pageVisited, and badges //yes
            return axios({
                method: 'post',
                url: profile_url+"/stats",
                data:{
                    username:"bob",
                    platformId:platformId 
                },
                headers: { Cookie: cookie }
            }).then(function(response){
              	expect(response.status).to.equal(200, response.data);
            }).catch(function(error){
                expect(error.response.status).to.equal(200, error.response.data);
            });
        });
        // it("Get one user's platform info", function(){
        //     return axios({
        //         method: 'get',
        //         url: profile_url+"/stats",
        //     }).then(function(response){
        //       	expect(response.status).to.equal(200, response.data);
        //         delete response.data[0]['_id'];
        //         expect(response.data).to.deep.equal({
        //             _id:response.data._id,
        //             username:"bob",
        //             platformName:"All About Obscure Berries",
        //             completeId:[],
        //             timeSpend:0,
        //             widgetsClicked:0,
        //             modulesCompleted:0,
        //             pageVisited:0,
        //             badges:[],
        //             ownPlatform:{type:Boolean}
        //         });
        //     })
        //  //   .catch(function(error){
        //  //       expect(error.response.status).to.equal(400);
        //  //   });
        // });
    });
    context('Cleaning Up', function() {
        expect(process.env.NODE_ENV).to.not.equal('PROD');
        it("Deleting Registered User", function(){
            return helper.deleteUser("bob")
            .then(function(response){
                expect(response.status).to.equal(200, response.data);
            });
        });
        it("Clean up platform",function(){
            return helper.deletePlatform(platformId)
            .then(function(response){
                expect(response.status).to.equal(200, response.data);
            });
        });
    });
});