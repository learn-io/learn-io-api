var expect = require("chai").expect;
var axios = require("axios");

const profile_url="http://localhost:3000/profile";

// describe("Profile Tests", function(){
//     context("Retrieve Platform Info", function(){
//         it("Get one user's platform info", function(){
//             return axios({
//                 method: 'get',
//                 url: profile_url+"/bob/0/5",
//             }).then(function(response){
//               	expect(response.status).to.equal(200, response.data);
//                 delete response.data[0]['_id'];
//                 expect(response.data).to.deep.equal([{},{}]); //profile @TODO
//             }).catch(function(error){
//                 expect(error.response.status).to.equal(400);
//             });
//         });
//     });
// });