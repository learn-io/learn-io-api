var expect = require("chai").expect;
var axios = require("axios");
var crypto = require('crypto');

const helper=require('../controllers/testHelper');

const signin_url="http://localhost:3000/signin"
const signout_url="http://localhost:3000/signout"
const register_url="http://localhost:3000/register"

const reset_get_url="http://localhost:3000/reset/request"
const reset_set_url="http://localhost:3000/reset/password"


let cookie = "";

describe("Sign In Controller", function() {
    context('Setting Up', function() {
        
    });
    context('Sign In', function() {
        it("Register", function(){
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
                expect(response.data).to.deep.equal("test1");
            });
        });
        it("Register Twice", function(){
            return axios({
                method: 'post',
                url: register_url,
                data: {
                    username: "test1",
                    password: "pass1",
                    verifyPassword: "pass1", 
                    email: "email@email.email",
                    dateOfBirth: "11/9/1999" //TODO: formatting?
                },
                headers: { Cookie: cookie }
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data).to.deep.equal("test1");
            }).catch(function(err){
                expect(err.response).to.not.equal(undefined, err);
                expect(err.response.status).to.equal(401, err.response.data);
            });
        });
        it("Log Out", function(){
            return axios({
                method: 'post',
                url: signout_url,
                headers: { Cookie: cookie }
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
            });
        });
        it("Account Already Exists", function(){
            return axios({
                method: 'post',
                url: register_url,
                data: {
                    username: "test1",
                    password: "pass1",
                    verifyPassword: "pass1", 
                    email: "email@email.email",
                    dateOfBirth: "11/9/1999" //TODO: formatting?
                },
                headers: { Cookie: cookie }
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data).to.deep.equal("test1");
            }).catch(function(err){
                expect(err.response).to.not.equal(undefined, err);
                expect(err.response.status).to.equal(400, err.response.data);
            });
        });
        it("Log In", function(){
            return axios({
                method: 'post',
                url: signin_url,
                data: {
                  username: 'test1',
                  password: 'pass1'
                },
                headers: { Cookie: cookie }
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data).to.deep.equal("test1");
            });
        });
        it("Who Am I?", function(){
            return axios({
                method: 'get',
                url: signin_url+"/whoami",
                headers: { Cookie: cookie }
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data).to.deep.equal(["test1", false]);
            });
        });
        it("Log Out", function(){
            return axios({
                method: 'post',
                url: signout_url,
                headers: { Cookie: cookie }
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
            });
        });
        it("Log Out Twice", function(){
            return axios({
                method: 'post',
                url: signout_url,
                headers: { Cookie: cookie }
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
            }).catch(function(err){
                expect(err.response).to.not.equal(undefined, err);
                expect(err.response.status).to.equal(401, err.response.data);
            });
        });
        it("Wrong Password", function(){
            return axios({
                method: 'post',
                url: signin_url,
                data: {
                  username: 'test1',
                  password: 'pass21'
                },
                headers: { Cookie: cookie }
            }).then(function(response){
                expect(response.status).to.equal(401, response.data);
            }).catch(function(err){
                expect(err.response.status).to.equal(401, err.response.data);
            });
        });
        it("Reset Password and Log In", function(){ 
            return axios({
                method: 'post',
                url: reset_get_url,
                data: {
                  username: 'test1',
                  email: 'email@email.email'
                },
                headers: { Cookie: cookie }
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                return axios({
                    method: 'post',
                    url: reset_set_url,
                    data: {
                      key: crypto.createHash('sha256').update('test1').update('email@email.email').digest('utf8'),
                      newpass: 'bobby'
                    },
                    headers: { Cookie: cookie }
                });
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                return axios({
                    method: 'post',
                    url: signin_url,
                    data: {
                      username: 'test1',
                      password: 'bobby'
                    },
                    headers: { Cookie: cookie }
                });
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
            }).catch(function(err){
                expect(err.response).to.not.equal(undefined, err);
                expect(err.response.status).to.equal(401, err.response.data);
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