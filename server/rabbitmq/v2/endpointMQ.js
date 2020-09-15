const makePublisher = require('./emitMQpub')
const makeSubscriber = require('./recvMQsub')

let publisher;
let subscriber;
const URL = 'amqp://guest:guest@localhost:5672'
const TYPE = 'fanout'

const start = function(){
    publisher = makePublisher({ 
        exchange: 'testService', 
        type: TYPE, 
        url: URL 
    })
    subscriber = makeSubscriber({
        exchange: 'testService',
        queueName: 'testQueue',
        routingKeys: ['test'],
        type: TYPE, 
        url: URL
    })
}

const publish = function(message){
    if(message){
        publisher.start()
        publisher.publish('test', message)
    }
}

const consume = function(cb){
    subscriber.start(cb)
}

const stop = function(){
    publisher.stop();
    subscriber.stop();
    publish.close();
    subscriber.close();
}

module.exports = { start, stop, publish, consume }