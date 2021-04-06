var expect = require("chai").expect;
var axios = require("axios");


const platform_url="http://localhost:3000/search/platforms"
const user_url="http://localhost:3000/search/users"
const signout_url="http://localhost:3000/signout"
const register_url="http://localhost:3000/register"
const delete_url = "http://localhost:3000/admin/users/delete"

describe("Search Controller", function() {
    context('Setting Up', function() {
        
    });
    context('Platform Search', function() {

    });
    context('Setting Up User Search', function() {
        it("Register", function(){
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
                expect(response.status).to.equal(200, response.data);
            });
        });
    });
    context('User Search', function() {
        it("Bob Search", function(){
            return axios({
                method: 'get',
                url: user_url+"/bob/0/5",
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data).to.deep.equal([{username:'bob', email: "email@email.email", dateOfBirth: "11/9/1999"}]);
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
                  username: 'bob'
                }
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
            }).catch(function(err){
                expect(err.response.status).to.equal(200, err.response.data);
            });
        });
    });
});