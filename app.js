use 'strict';

console.log('Hello world');

const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });
var rubrica = [{ nome: "nome", cognome: "cognome" },
    { nome: "secondo", cognome: "terzo" }];

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, World!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.route({
    method: 'POST',
    path: '/api/items',
    handler: function (request, reply) {
        console.log("Aggiungi persona");
        rubrica.push({ nome: request.payload.nome, cognome: request.payload.cognome });
        reply(JSON.stringify(rubrica));
        console.log(rubrica);
    }
});

server.route({
    method: 'PUT',
    path: '/api/items/',
    handler: function (request, reply) {
        reply('Put item id: ' + request.params.id);
    }
});

server.route({
    method: 'DELETE',
    path: '/api/items/{cognome}',
    handler: function (request, reply) {
        rubrica.splice(request.params.cognome);
        reply('Delete item succesfully');
        console.log(rubrica);
    }
});

server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log("Server running at: " + server.info.uri);
});
