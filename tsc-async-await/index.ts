const asyncGreeting = (name, wait) => {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve('hi '+name);
    }, wait);
  });
}

const futureGreeting = asyncGreeting('fred', 100);
futureGreeting.then((result) => {
  console.log('result: '+result);
});

async function foo() {
  console.log('before 3000 await');
  const hiWilma = await asyncGreeting('wilma', 3000);
  console.log('after 3000 await');
  return hiWilma;
}

foo().then((result) => {
  console.log('result', result);
});