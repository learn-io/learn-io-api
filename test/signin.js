var expect = require("chai").expect;
var axios = require("axios");


const signin_url="http://localhost:3000/signin"
const signout_url="http://localhost:3000/signout"
const register_url="http://localhost:3000/register"
const delete_url = "http://localhost:3000/admin/users/delete"

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
        it("Log Out", function(){
            return axios({
                method: 'post',
                url: signout_url,
                data: {
                  username: 'test1',
                },
                headers: { Cookie: cookie }
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
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
                data: {
                  username: 'test1',
                },
                headers: { Cookie: cookie }
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
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
            return axios({
                method: 'post',
                url: delete_url,
                data: {
                  username: 'test1'
                },
                headers: { Cookie: cookie }
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
            }).catch(function(err){
                expect(err.response.status).to.equal(200, err.response.data);
            });
        });
    });
});