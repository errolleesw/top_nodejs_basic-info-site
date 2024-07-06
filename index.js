var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    const fileName = (pathName) => {
        if (pathName === "/") {
            return "index.html";
        } else {
            return "." + pathName + ".html";
        }
    }
    var filename = fileName(q.pathname);
    
    fs.readFile(filename, function (err, data) {
        if (err) {
            fs.readFile('./404.html', function (error, errorData) {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    return res.end("500 Internal Server Error");
                }
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write(errorData);
                return res.end();
            });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        }
    });
}).listen(8080);

console.log('Server running at http://localhost:8080/');