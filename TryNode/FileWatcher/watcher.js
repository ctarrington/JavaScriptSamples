"use strict";

const
	fs = require('fs'),
	spawn = require('child_process').spawn,
	filename = process.argv[2];

function onError(err)
{
	process.stderr.write('Fatal Error! '+err.message+'\n');
	process.exit(-1);
}

function logChange()
{	
	let ls_output = '';
	let ls = spawn('ls', ['-lh', filename]);

  	ls.stdout.on('data', function(chunk) {
  		ls_output += chunk;
  	});

  	ls.stdout.on('end', function() {
  		let tokens = ls_output.split(/\s+/);
  		console.log(filename+' changed. new size = '+tokens[4]);
  	});
}

function makeCopy()
{
	let file_output_stream = fs.createWriteStream(filename+'~'+Date.now());
	let file_input_stream = fs.createReadStream(filename);

	file_output_stream.on('error', onError);
	file_input_stream.on('error', onError);

	file_input_stream.pipe(file_output_stream);	
}

function go()
{
	fs.watch(filename, logChange);
	fs.watch(filename, makeCopy);
	makeCopy();

	console.log('Watching '+filename+ '...');
}

if (!filename) { throw Error('Please specify a file to watch'); }
go();

