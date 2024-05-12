//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];
//create server
http.createServer(function(req, res){
    //parse url
    var urlObj = url.parse(req.url, true);
    var pathName = urlObj.pathname;
    if(pathName == '/'){
        //read file
        fs.readFile('./index.html', function(err, data){
            if(err){
                console.log(err);
            }else{
                res.writeHead(200, {'Content-Type':'text/html'});
                res.end(data);
            }
        });
    }else if(pathName == '/submit'){
        var comment = urlObj.query;
        comment.data = new Date();
        comments.push(comment);
        res.end(JSON.stringify(comments));
    }else if(pathName == '/get'){
        res.end(JSON.stringify(comments));
    }else{
        fs.readFile('.' + pathName, function(err, data){
            if(err){
                console.log(err);
            }else{
                res.end(data);
            }
        });
    }
}).listen(3000, function(){
    console.log('Server running at http://