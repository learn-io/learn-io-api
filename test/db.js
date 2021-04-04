var expect = require("chai").expect;
var axios = require("axios");

const url="http://localhost:3000/"

describe("DB Tests", function() {
    context('Sign In Errors', function() {
        it("No Username", function(){
            return axios({
                method: 'post',
                url: url+"signin",
                data: {
                  password: 'Flintstone'
                }
              }).then(function(response){
                expect(response.status).to.equal(400);
            });
        });
        it("No Password", function(){
            return axios({
                method: 'post',
                url: url+"signin",
                data: {
                  username: 'Fred',
                }
              }).then(function(response){
                expect(response.status).to.equal(400);
            });
        });
        it("Bad Password", function(){
            return axios({
                method: 'post',
                url: url+"signin",
                data: {
                  username: 'Fred',
                  password: 'Flintstone'
                }
              }).then(function(response){
                expect(response.status).to.equal(401);
            });
        });
    });


    /*context('Sign In', function() {
        it("Register", function(){
            return axios({
                method: 'post',
                url: "http://localhost:3000/signin",
                data: {
                  username: 'Fred',
                  password: 'Flintstone'
                }
              }).then(function(response){
                expect(response.status).to.equal(401);
            });
        });
        it("Log Out", function(){
            return axios({
                method: 'post',
                url: "http://localhost:3000/signin",
                data: {
                  username: 'Fred',
                  password: 'Flintstone'
                }
              }).then(function(response){
                expect(response.status).to.equal(401);
            });
        });
        it("Log In", function(){
            return axios({
                method: 'post',
                url: "http://localhost:3000/signin",
                data: {
                  username: 'Fred',
                  password: 'Flintstone'
                }
              }).then(function(response){
                expect(response.status).to.equal(401);
            });
        });
    });*/
});