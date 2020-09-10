var amqp = require('amqplib/callback_api');


function emitMQTT(exchange, msg) {
  //amqp://user:pass@sub.example.com:8080
  amqp.connect('amqp://guest:guest@localhost:5672', function (error0, connection) {
    if (error0) {
      console.log(error0);
      return;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        console.log(error0);
        return;
      }

      if(exchange)
        exchange = 'turtle';
      if(msg)
        msg = 'Hello World!';

      channel.assertExchange(exchange, 'fanout', {
        durable: false
      });
      channel.publish(exchange, '', Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });

    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 3000);
  });
}

module.exports = {
  emitMQTT
}