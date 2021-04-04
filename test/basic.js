var expect = require("chai").expect;

describe("This is an example test!", function() {
    describe("This one always passes", function(){
        expect(1).to.equal(1);
        expect(5).to.equal(5);
    });
    describe("This one also always passes", function(){
        expect(2).to.equal(2);
        expect([1,2]).to.deep.equal([1,2]);
    });
});