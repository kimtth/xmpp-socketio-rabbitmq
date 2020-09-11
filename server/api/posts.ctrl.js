let postId = 1;
let posts = [];

/* 
POST /api/
*/
exports.write = ctx => {
  const { channel, message } = ctx.request.body;
  postId += 1;
  const post = { id: postId, channel, message };
  posts.push(post);
  ctx.body = post;

  sendHello(channel, message);
};

/* 
GET /api/:channel
*/
let payload = ''

exports.read = ctx => {
  const { channel } = ctx.params;
  sendHello(channel, setValue);
  const get = { message: payload }
  ctx.body = get;
};

setValue = (msg) => {
  payload = msg;
}

getHello = (channel,cb) => {
  console.log(channel);
  cb();
}

sendHello = (channel, message) => {
  console.log(channel, message);
}