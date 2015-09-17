describe("Destructuring", function() {


    it("should support unpacking an array with defaults", function() {
        var [thing, foo = 1, bar] = [,, 3];
        expect(foo).toBe(1);
        expect(bar).toBe(3);
    });

});

describe("Destructuring", function() {

    it("should support unpacking an object", function() {
        function getName()
        {
            return {
                fname: 'Fred',
                lname: 'Flintstone',
                contact: {phone: '410-121-1111', pager: '121-121-3333', snailMail:'1 Main Street'}
            };
        }

        var {
            fname: firstName,
            lname: lastName,
            contact: {phone: phoneNumber, pager: pagerNumber }
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
