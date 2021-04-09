var expect = require("chai").expect;
var axios = require("axios");

const helper=require('../controllers/testHelper');

const signin_url="http://localhost:3000/signin"
const signout_url="http://localhost:3000/signout"
const register_url="http://localhost:3000/register"

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