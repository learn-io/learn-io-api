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
    
    context("User's Platform Info", function(){
        it("Set one user's platform info", function(){ // Shouldn't handleUserPlay also have fields for completedId, timeSpend, widgetsClicked, pageVisited, and badges //yes
            return axios({
                method: 'post',
                url: profile_url+"/play",
                data:{
                    platformId:platformId 
                },
                headers: { Cookie: cookie }
            }).then(function(response){
              	expect(response.status).to.equal(200, response.data);
            })
            .catch(function(error){
                expect(error.response.status).to.equal(200, error.response.data);
            });
        });
        it("Update one user's platform info", function(){
            return axios({
                method: 'post',
                url: profile_url+"/update",
                data:{
                    platformId:platformId,
                    timeSpend:5,
                    modulesCompleted:0,
                    pageVisited:1,
                    score:6
                },
                headers: { Cookie: cookie}
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
            })
            // .catch(function(error){
            //     expect(error.response.status).to.equal(200, error.response.data);
            // });
        });
        it("Get one user's platform info", function(){
            return axios({
                method: 'get',
                url: profile_url+"/stats/bob/0/10",
            }).then(function(response){
              	expect(response.status).to.equal(200, response.data);
                delete response.data.resp[0]['_id'];
                expect(response.data).to.deep.equal({resp:[
                    {
                        platformId:platformId,
                        completeId:[],
                        timeSpend:5,
                        widgetsClicked:0,
                        modulesCompleted:0,
                        pageVisited:1,
                        badges:[false,false,false,false]
                    }
                ]});
            })
            .catch(function(error){
                expect(error.response).to.not.equal(null, error);
                expect(error.response.status).to.equal(200, error.response.data);
            });
        });
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