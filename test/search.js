var expect = require("chai").expect;
var axios = require("axios");

const helper=require('../controllers/testHelper');

const platform_url="http://localhost:3000/search/platforms";
const create_url="http://localhost:3000/platform"
const user_url="http://localhost:3000/search/users"
const register_url="http://localhost:3000/register"

describe("Search Controller", function() {
    let platformId1 = ""
    let platformId2 = ""
    context('Setting Up', function() {
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
        it("Create platform", function(){ 
            return axios({
                method: 'post',
                url: create_url,
                data:{
                    platformName:"All Those Obscure Berries",
                    image:"",
                    description:"In platform you learn about berries." 
                },
                headers: { Cookie: cookie }
            }).then(function(response){
              	expect(response.status).to.equal(200, response.data);
                platformId1=response.data.platformId;
            }).catch(function(error){
                expect(error.response.status).to.equal(200, error.response.data);
            });
        });
        it("Create platform", function(){ 
            return axios({
                method: 'post',
                url: create_url,
                data:{
                    platformName:"Berry Cool!",
                    image:"",
                    description:"filler text" 
                },
                headers: { Cookie: cookie }
            }).then(function(response){
              	expect(response.status).to.equal(200, response.data);
                platformId2=response.data.platformId;
            }).catch(function(error){
                expect(error.response.status).to.equal(200, error.response.data);
            });
        });
    });
    context('Platform Search', function() {
        it("Berri Search", function(){
            return axios({
                method: 'get',
                url: platform_url+"/all/berri/0/5",
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                delete response.data[0]['_id'];
                expect(response.data).to.deep.equal([{platformName:'All Those Obscure Berries', image: "", owner: "test1", description: "In platform you learn about berries."}]);
            });
        });
        it("Berry Search", function(){
            return axios({
                method: 'get',
                url: platform_url+"/all/berry/0/5",
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                delete response.data[0]['_id'];
                expect(response.data).to.deep.equal([{platformName:'Berry Cool!', image: "", owner: "test1", description: "filler text"}]);
            });
        });
        it("Berr Search", function(){
            return axios({
                method: 'get',
                url: platform_url+"/all/berr/0/5",
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data.length).to.equal(2, response.data);
            });
        });
        it("User Filtered Berr Search", function(){
            return axios({
                method: 'get',
                url: platform_url+"/test1/berr/0/5",
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data.length).to.equal(2, response.data);
            });
        });
        it("Wrong User Filtered Berr Search", function(){
            return axios({
                method: 'get',
                url: platform_url+"/bob/berr/0/5",
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data.length).to.equal(0, response.data);
            });
        });
        it("Not A Platform Search", function(){
            return axios({
                method: 'get',
                url: platform_url+"/all/hello/0/5",
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data).to.deep.equal([]);
            });
        });
        it("Skip & Count Check", function(){
            let data1;
            return axios({
                method: 'get',
                url: platform_url+"/all/berr/1/5",
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data.length).to.equal(1, response.data);
                data1 = response.data;
                return axios({
                    method: 'get',
                    url: platform_url+"/all/berr/0/1",
                });
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data.length).to.equal(1, response.data);
                expect(response.data).to.not.deep.equal(data1);
            });
        });
    });
    context('Cleaning Up', function() {
        expect(process.env.NODE_ENV).to.not.equal('PROD');
        it("Clean up platform 1",function(){
            return helper.deletePlatform(platformId1)
            .then(function(response){
                expect(response.status).to.equal(200, response.data);
            });
        });
        it("Clean up platform 2",function(){
            return helper.deletePlatform(platformId2)
            .then(function(response){
                expect(response.status).to.equal(200, response.data);
            });
        });
        it("Deleting Registered User", function(){
            return helper.deleteUser("test1")
            .then(function(response){
                expect(response.status).to.equal(200, response.data);
            }).catch(function(err){
                expect(err.response.status).to.equal(200, err.response.data);
            });
        });
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
        it("Register", function(){
            return axios({
                method: 'post',
                url: register_url,
                data: {
                    username: "dmin",
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
                delete response.data[0]['_id'];
                expect(response.data).to.deep.equal([{username:'bob', email: "email@email.email", dateOfBirth: "11/9/1999"}]);
            });
        });
        it("Skip Bob Search", function(){
            return axios({
                method: 'get',
                url: user_url+"/bob/1/5",
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data).to.deep.equal([]);
            });
        });
        it("Not A User Search", function(){
            return axios({
                method: 'get',
                url: user_url+"/notauser/0/5",
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data).to.deep.equal([]);
            });
        });
        it("'min' Search", function(){
            return axios({
                method: 'get',
                url: user_url+"/min/0/5",
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data.length).to.equal(2, response.data);
                delete response.data[0]['_id'];
                delete response.data[1]['_id'];
                expect(response.data).to.deep.equal([{username:'admin', email: "email@email.email", dateOfBirth: "11/9/1999"}, {username:'dmin', email: "email@email.email", dateOfBirth: "11/9/1999"}]);
            });
        });
        it("Skip & Count Check", function(){
            let data1;
            return axios({
                method: 'get',
                url: user_url+"/min/1/5",
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data.length).to.equal(1, response.data);
                data1 = response.data;
                return axios({
                    method: 'get',
                    url: user_url+"/min/0/1",
                });
            }).then(function(response){
                expect(response.status).to.equal(200, response.data);
                expect(response.data.length).to.equal(1, response.data);
                expect(response.data).to.not.deep.equal(data1);
            });
        });
    });
    context('Cleaning Up', function() {
        expect(process.env.NODE_ENV).to.not.equal('PROD');
        it("Deleting Registered User bob", function(){
            return helper.deleteUser("bob")
            .then(function(response){
                expect(response.status).to.equal(200, response.data);
            }).catch(function(err){
                expect(err.response.status).to.equal(200, err.response.data);
            });
        });
        it("Deleting Registered User dmin", function(){
            return helper.deleteUser("dmin")
            .then(function(response){
                expect(response.status).to.equal(200, response.data);
            }).catch(function(err){
                expect(err.response.status).to.equal(200, err.response.data);
            });
        });
    });
});