const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require("koa-bodyparser");
const serve = require('koa-static');
const mount = require("koa-mount");
const cors = require('koa-cors');
const { socketServer } = require('./server/socketio/socketServer');

const app = new Koa();
app.use(BodyParser()); //Kim: Bodyparser should be set before router.
app.use(cors());

const static_pages = new Koa();
static_pages.use(serve(__dirname + "/build")); //serve the build directory
app.use(mount("/", static_pages));

const api = require('./server/api');
const router = new Router();
router.use('/api', api.routes()); 
app.use(router.routes()).use(router.allowedMethods());

//Kim: Remeber to listen on "server" not "app"
//Kim: The static and socke.io share the same port number.
const server = require('http').createServer(app.callback())
socketServer(server);