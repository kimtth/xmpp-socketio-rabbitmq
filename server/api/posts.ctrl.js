
const { emitMQTT } = require('../rabbitmq/emitMQclient');
const { receiveMQTT } = require('../rabbitmq/receiveMQclient');

let postId = 1;
const posts = [];

/* 
POST /api/
*/
exports.write = ctx => {
  const { channel, message } = ctx.request.body;
  postId += 1;
  const post = { id: postId, channel, message };
  posts.push(post);
  ctx.body = post;

  emitMQTT(channel, message);
};

/* 
GET /api/:channel
*/
exports.read = ctx => {
  const { channel } = ctx.params;
  const msg = receiveMQTT(channel);
  const get = { message: msg }
  ctx.body = get;
};