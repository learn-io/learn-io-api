var expect = require("chai").expect;
var axios = require("axios");

const url="http://localhost:3000/"
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
    context('Setting Errors', function() {
        it("change email", function(){
            return axios({
                method: 'post',
                url: url+"setting",
                data: {
                	username:"test",
                  	email: "tes@gmail.com"
                }
              }).then(function(response){
                expect(response.data).to.equal("Success Update Email");
            });
        });
        it("change dateOfBirth", function(){
            return axios({
                method: 'post',
                url: url+"setting",
                data: {
                	username:"test",
                  	dateOfBirth: "02/02/2000"
                }
              }).then(function(response){
                expect(response.data).to.equal("Success Update date of birth");
            });
        });
        it("change password", function(){
            return axios({
                method: 'post',
                url: url+"setting",
                data: {
                	username:"test",
                  	oldPassword: "test123",
                  	newPassword: "test23"
                }
              }).then(function(response){
                expect(response.data).to.equal("Success update password");
            });
        });
        it("change mute setting", function(){
            return axios({
                method: 'post',
                url: url+"setting",
                data: {
                	username:"test",
                  	mute: true
                }
              }).then(function(response){
                expect(response.data).to.equal("Success mute setting");
            });
        });
    });

});