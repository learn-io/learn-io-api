var expect = require("chai").expect;
var axios = require("axios");

var url = "http://localhost:3000/"

describe("This is an example network test!", function() {
    context('axios', function() {
        it("sample post", function(){
            return axios({
                method: 'post',
                url: "https://httpbin.org/anything",
                data: {
                  firstName: 'Fred',
                  lastName: 'Flintstone'
                }
              }).then(function(response){
                expect(response.status).to.equal(200);
            });
        });
        it("sample get", function(){
            return axios({
                method: 'get',
                url: 'https://httpbin.org/anything',
            }).then(function(response){
                expect(response.status).to.equal(200);
            });
        });
    });
});