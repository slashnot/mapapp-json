var jsonServer = require('json-server');

var server = jsonServer.create();

server.set('port', (process.env.PORT || 5000));

server.use(jsonServer.defaults());

var router = jsonServer.router('soki.json');

//Custom Routes
// Add this before server.use(router)
server.use(jsonServer.rewriter({
  '/api/': '/',
  '/v1/users/login': '/login',
  '/v1/users/profile': '/profile',
  '/v1/transactions':'/transactions',
  '/v1/balances':'/balances',
  '/v1/updates':'/updates',
  '/v1/tickets':'/tickets',
  '/v1/neighbours':'/neighbours',
  '/v1/access':'/access'
}));

server.use(router);

server.listen(server.get('port'), function() {
  console.log('Node app is running on port', server.get('port'));
});
