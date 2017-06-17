const promisify = require('util').promisify;
const fs = require('fs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);


async function doIt() {
  const contents = await readFile('./silly.txt', 'utf8');
  const modified = contents.toUpperCase();
  await writeFile('./modified.txt', modified);

  return contents;
}

doIt().then(() => {
  console.log('done');
});
