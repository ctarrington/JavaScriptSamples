$(document).ready( ->

  class Watcher
    constructor: (@name) ->
      
    sayHi: (toName) ->
      $('#results').append("#{@name} says hello to #{toName}</br>");
      
    watch: (buttonId) ->
      $('#'+buttonId).click( (e) => 
        toname = $('#name').val()
        this.sayHi(toname))


  bill = new Watcher('Bill')
  bill.watch('button1');
  
  bob = new Watcher('Bob')
  bob.watch('button1');
    
  bill.watch('button2');
  bill.name = 'William'  #simple, but no encapsulation
);