var querystring = require("querystring");
var fs = require("fs");

function start(response) {
	console.log("Request handler 'start' was called.");
	fs.readFile('input.html', {"encoding": "UTF-8"}, function(err, data) {
		if (err) throw err;
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
		});
}

function upload(response, postData) {
	console.log("Request handler ' upload' was called.");
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write("You've sent the text: "+ querystring.parse(postData).text);
		response.end();
} 
function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("./tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;