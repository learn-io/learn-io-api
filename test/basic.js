var expect = require("chai").expect;

describe("This is an example test!", function() {
    context('Context with two tests', function() {
        it("always passes", function(){
            expect(1).to.equal(1);
            expect(5).to.equal(5);
        });
        it("also always passes", function(){
            expect(4).to.equal(4);
            expect(566).to.equal(566);
        });
    });
    context('context with one test', function()
    {
        it("also also always passes", function(){
            expect(2).to.equal(2);
            expect([1,2]).to.deep.equal([1,2]);
            //test change!
        });
    });
});