var expect = require("chai").expect;
var axios = require("axios");

const setting_url="http://localhost:3000/setting"
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
    context('Setting change', function() {
        it("change email", function(){
            return axios({
                method: 'post',
                url: setting_url,
                data: {
                	username:"test",
                  	email: "tes@gmail.com"
                }
              }).then(function(response){
              	expect(response.status).to.equal(200);
                expect(response.data).to.equal("Success Update Email");
            }).catch(function(error){
                expect(error.response.status).to.equal(200);
            });
        });
        it("change dateOfBirth", function(){
            return axios({
                method: 'post',
                url: setting_url,
                data: {
                	username:"test",
                  	dateOfBirth: "02/02/2000"
                }
              }).then(function(response){
              	expect(response.status).to.equal(200);
                expect(response.data).to.equal("Success Update date of birth");
            }).catch(function(error){
                expect(error.response.status).to.equal(200);
            });
        });
        it("change password", function(){
            return axios({
                method: 'post',
                url: setting_url,
                data: {
                	username:"test",
                  	oldPassword: "test123",
                  	newPassword: "test23"
                }
              }).then(function(response){
              	expect(response.status).to.equal(200);
                expect(response.data).to.equal("Success update password");
            }).catch(function(error){
                expect(error.response.status).to.equal(200);
            });
        });
        it("change mute setting", function(){
            return axios({
                method: 'post',
                url: setting_url,
                data: {
                	username:"test",
                  	mute: true
                }
              }).then(function(response){
              	expect(response.status).to.equal(200);
                expect(response.data).to.equal("Success mute setting");
            }).catch(function(error){
                expect(error.response.status).to.equal(200);
            });
        });
    });
    context('Setting Errors', function() {
        it("enter not exist user", function(){
            return axios({
                method: 'post',
                url: setting_url,
                data: {
                	username:"test2",
                  	email: "tes@gmail.com"
                }
              }).then(function(response){
              	expect(response.status).to.equal(400);
            }).catch(function(error){
                expect(error.response.status).to.equal(400);
            });
        });
        it("incorrect old password", function(){
            return axios({
                method: 'post',
                url: setting_url,
                data: {
                	username:"test",
                  	oldPassword: "test1233",
                  	newPassword: "test23"
                }
              }).then(function(response){
              	expect(response.status).to.equal(400);
            }).catch(function(error){
                expect(error.response.status).to.equal(400);
            });
        });
        it("not username", function(){
            return axios({
                method: 'post',
                url: setting_url,
                data: {
                  	email: "tes@gmail.com"
                }
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
                  	username:"test"
                }
              }).then(function(response){
              	expect(response.status).to.equal(400);
            }).catch(function(error){
                expect(error.response.status).to.equal(400);
            });
        });
    });
});