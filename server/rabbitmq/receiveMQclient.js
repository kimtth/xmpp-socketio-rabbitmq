var amqp = require('amqplib/callback_api');

function receiveMQTT(exchange, cb) {
  amqp.connect('amqp://guest:guest@localhost:5672', function (error0, connection) {
    if (error0) {
      console.log(error0);
      return;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        console.log(error1);
        return;
      }

      if(exchange)
        exchange = 'turtle';

      channel.assertExchange(exchange, 'fanout', {
        durable: true
      });

      channel.assertQueue('', {
        exclusive: true
      }, function (error2, q) {
        if (error2) {
          console.log(error2);
          return;
        }
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
        channel.bindQueue(q.queue, exchange, '');

        channel.consume(q.queue, function (msg) {
          if (msg.content) {
            console.log(" [x] %s", msg.content.toString());
            cb(msg.content.toString()); //kim: add
          }else{
            cb('something was wrong...'); //kim: add
          }
        }, {
          noAck: true
        });
      });
    });
  });
}

module.exports = {
  receiveMQTT
}