var http = require('http');
var sockjs = require('sockjs');
var node_static = require('node-static');

// 1. Echo sockjs server
var sockjs_opts = { sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js" };

var sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', function (conn) {
    conn.on('data', function (message) {
        conn.write(message + 'from Server');
    });
    var count = 0;
    if (count <= 40) {
        setInterval(function () {
            count++;
            conn.write("Data-->" + Math.floor(Math.random() * (10 - 1) + 1));
        }, 1000);
    }

});

// 2. Static files server
var static_directory = new node_static.Server(__dirname);

// 3. Usual http stuff
var server = http.createServer();
server.addListener('request', function (req, res) {
    static_directory.serve(req, res);
});
server.addListener('upgrade', function (req, res) {
    res.end();
});

sockjs_echo.installHandlers(server, { prefix: '/echo' });

console.log(' [*] Listening on 127.0.0.1:9999');
server.listen(9999, '127.0.0.1');