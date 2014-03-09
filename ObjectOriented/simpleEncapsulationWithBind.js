$(document).ready(function() {

    var people = [];

   function getName() { return this.name; }
   function setName(name) { this.name = name; }
   function getHeight() { return this.height; }

   function createPerson(name, height) 
   {
       var privateScope = {name: name, height: height};
       
       var newPerson = {};
       newPerson.getName = getName.bind(privateScope);
       newPerson.setName = setName.bind(privateScope);
       newPerson.getHeight = getHeight.bind(privateScope);
       return newPerson;
   }

   $('button#button1').click(function() {
       var name = $('input#name').val();
       var height = $('input#height').val();
       var person = createPerson(name, height);

       var result = person.getName();
       result = person.getHeight();
       $('#results').html(result);

       people.push(person);
   });
});

/* from console
people[0].getHeight()
"71"
people[1].getName()
"Larry"
people[1].setName('Scary')
undefined
people[1].getName()
"Scary"
people[1].getName()


 people[0].name
 undefined
*/
