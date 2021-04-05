var expect = require("chai").expect;
var axios = require("axios");

const signin_url="http://localhost:3000/signin"
const signout_url="http://localhost:3000/signout"
const register_url="http://localhost:3000/register"
const delete_url = "http://localhost:3000/admin/users/delete"

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
                expect(response.status).to.equal(200);
                expect(response.data).to.deep.equal("test1");
            }).catch(function(error){
                expect(error.response.status).to.equal(200);
            });
        });
        it("Log Out", function(){
            return axios({
                method: 'post',
                url: signout_url,
                data: {
                  username: 'test1',
                }
            }).then(function(response){
                expect(response.status).to.equal(200);
            }).catch(function(error){
                expect(error.response.status).to.equal(200);
            });
        });
        it("Log In", function(){
            return axios({
                method: 'post',
                url: signin_url,
                data: {
                  username: 'test1',
                  password: 'pass1'
                }
            }).then(function(response){
                expect(response.status).to.equal(200);
                expect(response.data).to.deep.equal("test1");
            }).catch(function(error){
                expect(error.response.status).to.equal(200);
            });
        });
    });
    context('Sign In Errors', function() {
        it("No Username", function(){
            return axios({
                method: 'post',
                url: signin_url,
                data: {
                  password: 'Flintstone'
                }
            }).then(function(response){
                expect(response.status).to.equal(400);
            }).catch(function(error){
                expect(error.response.status).to.equal(400);
            });
        });
        it("No Password", function(){
            return axios({
                method: 'post',
                url: signin_url,
                data: {
                  username: 'Fred',
                }
            }).then(function(response){
                expect(response.status).to.equal(400);
            }).catch(function(error){
                expect(error.response.status).to.equal(400);
            });
        });
        it("Bad Password", function(){
            return axios({
                method: 'post',
                url: signin_url,
                data: {
                  username: 'test1',
                  password: 'Flintstone'
                }
            }).then(function(response){
                expect(response.status).to.equal(401);
            }).catch(function(error){
                expect(error.response.status).to.equal(401);
            });
        });
        it("Bad Username", function(){
            return axios({
                method: 'post',
                url: signin_url,
                data: {
                  username: 'fakeuser',
                  password: 'Flintstone'
                }
            }).then(function(response){
                expect(response.status).to.equal(401);
            }).catch(function(error){
                expect(error.response.status).to.equal(401);
            });
        });
    });
    context('Cleaning Up', function() {
        expect(process.env.NODE_ENV).to.not.equal('PROD');
        it("Deleting Registered User", function(){
            return axios({
                method: 'post',
                url: delete_url,
                data: {
                  username: 'test1'
                }
            }).catch(function(error){
                expect(error.response.status).to.equal(200);
            }).then(function(response){
                expect(response.status).to.equal(200);
            });
        });
    });
});