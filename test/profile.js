var expect = require("chai").expect;
var axios = require("axios");

const profile_url="http://localhost:3000/profile";

describe("Profile Tests", function(){
    context("Retrieve Platform Info", function(){
        // it("Set one user's platform info", function(){ // Shouldn't handleUserPlay also have fields for completedId, timeSpend, widgetsClicked, pageVisited, and badges
        //     return axios({
        //         method: 'post',
        //         url: profile_url+"/stats",
        //         data:{
        //             username:"bob",
        //             platformName:"All About Obscure Berries"
        //         },
        //         headers: { Cookie: cookie }
        //     }).then(function(response){
        //       	expect(response.status).to.equal(200, response.data);
        //     }).catch(function(error){
        //         expect(error.response.status).to.equal(400);
        //     });
        // });
        // it("Get one user's platform info", function(){
        //     return axios({
        //         method: 'get',
        //         url: profile_url+"/stats",
        //     }).then(function(response){
        //       	expect(response.status).to.equal(200, response.data);
        //         delete response.data[0]['_id'];
        //         expect(response.data).to.deep.equal({
        //             _id:response.data._id,
        //             username:"bob",
        //             platformName:"All About Obscure Berries",
        //             completeId:[],
        //             timeSpend:0,
        //             widgetsClicked:0,
        //             modulesCompleted:0,
        //             pageVisited:0,
        //             badges:[],
        //             ownPlatform:{type:Boolean}
        //         });
        //     })
        //  //   .catch(function(error){
        //  //       expect(error.response.status).to.equal(400);
        //  //   });
        // });
    });
});