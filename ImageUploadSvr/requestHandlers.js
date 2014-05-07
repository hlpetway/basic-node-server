var querystring = require("querystring");
var fs = require("fs");
formidable = require("formidable");

function start(response) {
	console.log("Request handler 'start' was called.");
	fs.readFile('input.html', {"encoding": "UTF-8"}, function(err, data) {
		if (err) throw err;
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
		});
}

function upload(response, request) {
	console.log("Request handler ' upload' was called.");

	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");

		fs.rename(files.upload.path, "./tmp/test.png", function(error) {
			if (error) {
				fs.unlink("./tmp/test.png");
				fs.rename(files.upload.path, "./tmp/test.png");
			}
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image: <br/> ");
		response.write("<img src='/show' />");
		response.end();
	});
} 

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("./tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;