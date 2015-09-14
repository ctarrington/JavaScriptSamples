describe("Person", function() {


    it("should rotate its greeting", function () {
        var joe = new Person('Joe', ['Hi', 'Yo']);

        expect(joe.greet()).toBe('Joe says Hi');
        expect(joe.greet()).toBe('Joe says Yo');
        expect(joe.greet()).toBe('Joe says Hi');
    });

});