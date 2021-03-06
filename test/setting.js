var expect = require("chai").expect;
var axios = require("axios");

const helper=require('../controllers/testHelper');


const setting_url="http://localhost:3000/setting"
const register_url="http://localhost:3000/register"

let cookie = "";

// use the following to create value into database "userInfo", then run test
// {
//     "username":"test",
//     "password":"test123",
//     "verifyPassword":"test123",
//     "email":"test@gmail.com",
//     "dateOfBirth":"01/02/2000"
// }
// email,dateOfBirth,oldPassword,newPassword,mute
describe("Setting Tests", function() {
    context('Setting Up', function() {
        it("Register for Session", function(){
            return axios({
                method: 'post',
                url: register_url,
                data: {
                    username: "test1",
                    password: "pass1",
                    verifyPassword: "pass1", 
                    email: "email@email.email",
                    dateOfBirth: "11/9/1999" //TODO: formatting?
                }
            }).then(function(response){
                cookie = response.headers["set-cookie"][0]
                expect(response.status).to.equal(200, response.data);
            }).catch(function(err){
                expect(err.response.status).to.equal(200, err.response.data);
            });
        });
    });

    context('Get Setting', function() {
        it("Check setting vlaue", function(){
            return axios({
                method: 'get',
                url: setting_url,
                headers: { Cookie: cookie }
            }).then(function(response){
                expect(response.status).to.equal(200);
                expect(response.data.email).to.equal("email@email.email");
                expect(response.data.dateOfBirth).to.equal("11/9/1999");
                expect(response.data.mute).to.equal(false);
            }).catch(function(err){
                expect(error.response.status).to.equal(200);
            });
        });
    });
    context('Setting change', function() {
        it("change email", function(){
            return axios({
                method: 'post',
                url: setting_url,
                data: {
                  	email: "tes@gmail.com"
                },
                headers: { Cookie: cookie }
              }).then(function(response){
              	expect(response.status).to.equal(200);
                expect(response.data).to.equal("Success Update");
            }).catch(function(error){
                expect(error.response.status).to.equal(200);
            });
        });
        it("change dateOfBirth", function(){
            return axios({
                method: 'post',
                url: setting_url,
                data: {
                  	dateOfBirth: "02/02/2000"
                },
                headers: { Cookie: cookie }
              }).then(function(response){
              	expect(response.status).to.equal(200);
                expect(response.data).to.equal("Success Update");
            }).catch(function(error){
                expect(error.response.status).to.equal(200);
            });
        });
        it("change password", function(){
            return axios({
                method: 'post',
                url: setting_url,
                data: {
                  	oldPassword: "pass1",
                  	newPassword: "pass12"
                },
                headers: { Cookie: cookie }
              }).then(function(response){
              	expect(response.status).to.equal(200);
                expect(response.data).to.equal("Success Update");
            }).catch(function(error){
                expect(error.response.status).to.equal(200);
            });
        });
        it("change mute setting", function(){
            return axios({
                method: 'post',
                url: setting_url,
                data: {
                  	mute: true
                },
                headers: { Cookie: cookie }
              }).then(function(response){
              	expect(response.status).to.equal(200);
                expect(response.data).to.equal("Success Update");
            }).catch(function(error){
                expect(error.response.status).to.equal(200);
            });
        });
    });
    context('Check setting after changed', function() {
        it("Check setting vlaue", function(){
            return axios({
                method: 'get',
                url: setting_url,
                headers: { Cookie: cookie }
            }).then(function(response){
                expect(response.status).to.equal(200);
                expect(response.data.email).to.equal("tes@gmail.com");
                expect(response.data.dateOfBirth).to.equal("02/02/2000");
                expect(response.data.mute).to.equal(true);
            }).catch(function(err){
                expect(err.response.status).to.equal(200);
            });
        });
        it("change all", function(){
            return axios({
                method: 'post',
                url: setting_url,
                data: {
                    email: "fakeemail@gmail.com",
                    dateOfBirth: "03/04/2000",
                    mute: false
                },
                headers: { Cookie: cookie }
              }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data).to.equal("Success Update");
                return axios({
                    method: 'get',
                    url: setting_url,
                    headers: { Cookie: cookie }
                })
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data.email).to.equal("fakeemail@gmail.com");
                expect(response.data.dateOfBirth).to.equal("03/04/2000");
                expect(response.data.mute).to.equal(false);
            }).catch(function(err){
                expect(err.response).to.not.equal(undefined, err);
                expect(err.response.status).to.equal(200, err.response.data);
            });
        });
    });
    context('Setting Errors', function() {
        it("incorrect old password", function(){
            return axios({
                method: 'post',
                url: setting_url,
                data: {
                  	oldPassword: "test1233",
                  	newPassword: "test23"
                },
                headers: { Cookie: cookie }
              }).then(function(response){
              	expect(response.status).to.equal(400);
            }).catch(function(error){
                expect(error.response.status).to.equal(400);
            });
        });
        it("nothing change", function(){
            return axios({
                method: 'post',
                url: setting_url,
                data: {
                },
                headers: { Cookie: cookie }
              }).then(function(response){
              	expect(response.status).to.equal(400);
            }).catch(function(error){
                expect(error.response.status).to.equal(400);
            });
        });
    });
    context('Cleaning Up', function() {
        expect(process.env.NODE_ENV).to.not.equal('PROD');
        it("Deleting Registered User", function(){
            return helper.deleteUser("test1")
            .then(function(response){
                expect(response.status).to.equal(200, response.data);
            }).catch(function(err){
                expect(err.response.status).to.equal(200, err.response.data);
            });
        });
    });
});