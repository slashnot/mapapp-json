var jsonServer = require('json-server');

var server = jsonServer.create();

server.set('port', (process.env.PORT || 5000));

server.use(jsonServer.defaults());

var router = jsonServer.router('data.json');


server.use(router);

server.listen(server.get('port'), function() {
  console.log('Node app is running on port', server.get('port'));
});
