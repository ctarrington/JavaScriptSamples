'use strict';

class Person
{
    constructor(name, greetings)
    {
        this.name = name;
        this.greetings = greetings;
        this.greetingIndex = 0;
    }

    greet() {
        var response = this.name+' says '+this.greetings[this.greetingIndex];
        this.greetingIndex++;
        if (this.greetingIndex == this.greetings.length) { this.greetingIndex = 0; }
        return response;
    }
}