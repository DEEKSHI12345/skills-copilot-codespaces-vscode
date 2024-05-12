//create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = [];

var server = http.createServer(function (req, res) {
    var parseObj = url.parse(req.url, true);
    var pathname = parseObj.pathname;
    if (pathname === '/') {
        fs.readFile('./views/index.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.');
            }
            var htmlStr = template.render(data.toString(), {
                comments: comments
            });
            res.end(htmlStr);
        });
    } else if (pathname === '/post') {
        fs.readFile('./views/post.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.');
            }
            res.end(data);
        });
    } else if (pathname.indexOf('/public/') === 0) {
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                return res.end('404 Not Found.');
            }
            res.end(data);
        });
    } else if (pathname === '/pinglun') {
        var comment = parseObj.query;
        comment.dateTime = '2017-11-12';
        comments.unshift(comment);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else {
        fs.readFile('./views/404.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.');
            }
            res.end(data);
        });
    }
});

server.listen(3000, function () {
    console.log('running...');
});

var template = {
    render: function (tplStr, obj) {
        return tplStr.replace(/<%=([\s\S]+?)%>/g, function (match, $1) {
            return obj[$1];
        });
    }
};