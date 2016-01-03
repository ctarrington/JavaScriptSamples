describe("Destructuring", function() {


    it("should support unpacking an array with defaults", function() {
        var [thing, foo = 1, bar] = [,, 3];
        expect(thing).not.toBeDefined();
        expect(foo).toBe(1);
        expect(bar).toBe(3);
    });

    it("should support unpacking an object", function() {
        function getName()
        {
            return {
                firstName: 'Fred',
                lname: 'Flintstone',
                contact: {phone: '410-121-1111', pager: '121-121-3333', snailMail:'1 Main Street'}
            };
        }

        var {
            firstName,   // matches exactly so no need to repeat
            lname: lastName,  // translate
            contact: {phone: phoneNumber, pager: pagerNumber }   // flatten and rename
            } = getName();

        expect(firstName).toBe('Fred');
        expect(lastName).toBe('Flintstone');
        expect(phoneNumber).toBe('410-121-1111');
        expect(pagerNumber).toBe('121-121-3333');

    });

});

describe("Functions", function() {

    it("should support default values", function() {

        function multiply(x, y=2)
        {
            return x*y;
        }

        expect(multiply(3,4)).toBe(12);
        expect(multiply(3)).toBe(6);

    });
});

describe("Formatting", function() {

    it("should support formatting from an object", function() {
        var [name,greeting] = ['ted', 'hi there'];
        var person = {name, greeting};
        var formatted = `${name} says ${greeting}`;
        expect(formatted).toBe('ted says hi there');
    });
});
