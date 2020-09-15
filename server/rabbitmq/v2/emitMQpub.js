//https://github.com/davesag/amqp-simple-pub-sub.git

const amqp = require('amqplib')

const makePublisher = function (options) {

  const { exchange, type, url } = options

  if (!exchange) return

  let connection
  let channel

  const start = async () => {
    if (channel) return
    connection = await amqp.connect(url)
    channel = await connection.createChannel()
    await channel.assertExchange(exchange, type, { durable: true })
  }

  const stop = async () => {
    if (!channel) return
    await channel.close()
    channel = undefined
  }

  const publish = async (key, message) => {
    if (!channel) return
    const buffer = Buffer.from(message)
    return channel.publish(exchange, key, buffer)
  }

  const close = async () => {
    if (!connection) return
    await connection.close()
    channel = undefined
    connection = undefined
  }

  return { start, stop, publish, close }
}

module.exports = makePublisher