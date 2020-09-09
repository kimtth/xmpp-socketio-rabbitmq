// import socketServer from './modules/socketio/socketServer';
// import emitMQTT from './modules/rabbitmq/emitMQclient';

const { socketServer } = require('./modules/socketio/socketServer');
const { emitMQTT } = require('./modules/rabbitmq/emitMQclient');

socketServer();
emitMQTT();

