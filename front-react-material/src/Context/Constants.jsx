export const MessageMode = {
    SocketHost: 'SH',
    SocketParticipant: 'SP',
    Publisher: 'MP',
    Subscriber: 'MS',
}

export const ChannelType = {
    One: 'Ch#1',
    Two: 'Ch#2',
    Three: 'Ch#3'
}

export const SocketURL = 'http://localhost:4000/'
const amqpURL = ''

export const ApiEndpoint = {
    SocketHost: SocketURL + 'SendSH',
    SocketParticipant: SocketURL + 'SendSP',
    Publisher: amqpURL + 'SendMP',
    Subscriber: amqpURL + 'SendMS',    
}