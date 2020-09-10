const Koa = require('koa');
const BodyParser = require("koa-bodyparser");
const serve = require('koa-static');
const mount = require("koa-mount");
const cors = require('koa-cors');
const {
    socketServer
} = require('./server/socketio/socketServer');
const {
    emitMQTT
} = require('./server/rabbitmq/emitMQclient');

const app = new Koa();
app.use(BodyParser());
app.use(cors());

const static_pages = new Koa();
static_pages.use(serve(__dirname + "/build")); //serve the build directory
app.use(mount("/", static_pages));

const port = 8080;
app.listen(port, () => {
    console.log(`Listening on (Middleware) ${ port }`)
})

// this last middleware catches any request that isn't handled by
// koa-static or koa-router, ie your index.html in your example
// app.use(function* index() {
//     yield send(this, __dirname + '/index.html');
// });

//Kim: Remeber to listen on "server" not "app"
const server = require('http').createServer(app.callback())
socketServer(server);
//emitMQTT();