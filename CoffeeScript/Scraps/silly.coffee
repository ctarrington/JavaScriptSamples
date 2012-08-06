if elvis? 
  console.log('0 he survived after all')

elvis = null
if elvis? 
  console.log('1 he survived after all')
  
elvis = 0
if elvis? 
  console.log('2 he survived after all')
  
fred = {
  name: 'Fred'
  address:
    street: '1 main street'
    city: 'Smalltown'
    zip: 21122
}


console.log("fred is called #{fred.name}")

if fred.job?.title?
  console.log("fred is a #{fred.job.title}")
else
  console.log("poor fred is jobless")
  
fred.job = {
  title: 'Head Dude'
}

console.log("Now fred is a #{fred.job.title}") if fred.job?.title?
  