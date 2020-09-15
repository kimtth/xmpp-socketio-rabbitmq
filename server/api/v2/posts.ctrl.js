let postId = 1;
let posts = [];
const { start, stop, publish, consume } = require('../../rabbitmq/v2/endpointMQ');

/* 
POST /api/ emit
*/
exports.write = ctx => {
  const { channel, message } = ctx.request.body;
  postId += 1;
  const post = { id: postId, channel: 'testService', message };
  posts.push(post);
  ctx.body = post;

  publish(message);
};

/* 
GET /api/:channel /receive
*/
let payload = '';

exports.read = ctx => {
  const { channel } = ctx.params;

  consume((msg) => {
    payload = msg
  });
  const get = { message: payload }
  ctx.body = get;
};

/* 
POST /api/stop
*/
exports.stop = ctx => {
  stop();
  const post = { message: 'closed' };
  posts.push(post);
  ctx.body = post;
};

/* 
POST /api/start
*/
exports.start = ctx => {
  start();
  const post = { message: 'started' };
  posts.push(post);
  ctx.body = post;
};