"use strict";

var Koa = require('koa');

var BodyParser = require("koa-bodyparser");

var serve = require('koa-static');

var mount = require("koa-mount");

var cors = require('koa-cors');

var _require = require('./server/socketio/socketServer'),
    socketServer = _require.socketServer;

var _require2 = require('./server/rabbitmq/emitMQclient'),
    emitMQTT = _require2.emitMQTT;

var app = new Koa();
app.use(BodyParser());
app.use(cors());
var static_pages = new Koa();
static_pages.use(serve(__dirname + "/build")); //serve the build directory

app.use(mount("/", static_pages)); // const port = 8080;
// app.listen(port, () => {
//     console.log(`Listening on (Middleware) ${ port }`)
// })
// this last middleware catches any request that isn't handled by
// koa-static or koa-router, ie your index.html in your example
// app.use(function* index() {
//     yield send(this, __dirname + '/index.html');
// });
//Kim: Remeber to listen on "server" not "app"
//Kim: The static and socke.io share the same port number.

var server = require('http').createServer(app.callback());

socketServer(server); //emitMQTT();