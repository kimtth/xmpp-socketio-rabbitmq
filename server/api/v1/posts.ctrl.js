let postId = 1;
let posts = [];
const { emitAMQP } = require('../../rabbitmq/v1/emitMQclient');
const { receiveAMQP } = require('../rabbitmq/receiveMQclient');


/* 
POST /api/ emit
*/
exports.write = ctx => {
  const { channel, message } = ctx.request.body;
  postId += 1;
  const post = { id: postId, channel, message };
  posts.push(post);
  ctx.body = post;

  const exchange = channel;
  emitAMQP(exchange, message);
};

/* 
GET /api/:channel /receive
*/
let payload = '';

exports.read = ctx => {
  const { channel } = ctx.params;
  const exchange = channel;

  receiveAMQP(exchange, (msg) => {
    payload = msg
  });
  const get = { message: payload }
  ctx.body = get;
};