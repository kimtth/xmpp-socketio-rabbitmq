const amqp = require('amqplib')

const makeSubscriber = function(options) {

  const { exchange, queueName, routingKeys, type, url } = options

  if (!exchange) return
  if (!queueName) return

  let connection
  let channel
  let queue

  const start = async (cb) => {
    if (channel) return
    connection = await amqp.connect(url)
    channel = await connection.createChannel()
    channel.assertExchange(exchange, type, { durable: true })
    const result = await channel.assertQueue(queueName, { exclusive: false })
    ;({ queue } = result) //??
    const rKeys = routingKeys || [queueName]
    rKeys.forEach(rKey => {
      channel.bindQueue(queue, exchange, rKey)
    })
    channel.prefetch(1)
    channel.consume(queue, (message)=>{
      if (message.content) {
          console.log(" [x] %s", message.content.toString());
          cb(message.content.toString());
      }
    }, {
      noAck: true
    })
  }

  const stop = async () => {
    if (!channel) return
    await channel.close()
    channel = undefined
  }

  const close = async () => {
    if (!connection) return
    await connection.close()
    channel = undefined
    connection = undefined
  }

  return { start, stop, close }
}

module.exports = makeSubscriber