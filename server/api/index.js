const Router = require('koa-router');
const postsCtrl = require('./v2/posts.ctrl');

const handler = new Router();

handler.post('/', postsCtrl.write);
handler.get('/:channel', postsCtrl.read);
handler.post('/stop', postsCtrl.stop);
handler.post('/start', postsCtrl.start);

module.exports = handler;