const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');

const posts = new Router();

posts.post('/', postsCtrl.write);
posts.get('/:channel', postsCtrl.read);

module.exports = posts;