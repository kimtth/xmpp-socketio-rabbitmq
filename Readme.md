# Attempts for finding a proper solution.

# XMPP Server

ejabberd (Most Popular XMPP server)

- User: admin@- localhost or admin@domain-name

- Password: e.g. admin (User defined)

- Management UI: http://localhost:5280/admin/

- Configuration file:  C:\ProgramData\ejabberd\conf\ejabberd.yml

```bash
    port: 5443
    module: ejabberd_http
    tls: false
    request_handlers:
      "/admin": ejabberd_web_admin
      "/api": mod_http_api
      "/bosh": mod_bosh
      "/captcha": ejabberd_captcha
      "/upload": mod_http_upload
      "/ws": ejabberd_http_ws
      "/oauth": ejabberd_oauth
  -
```

- Endpoint (Turn-Off the TLS): 

    ws://localhost:5443/ws (WebSocket)

    http://localhost:5443/bosh (from Browser)

    if you are success, you will reach the below page from browser. 

```bash
ejabberd ejabberd_http_ws
An implementation of WebSocket protocol

This web page is only informative. To use WebSocket connection you need a Jabber/XMPP client that supports it.
```

- Creating Testing Account on Management UI

    ID: guest@domain-name Password: guest

    ID: guest2@domain-name Password: guest
    
- Conclusion of XMPP client using StanzaJS / simple-xmpp / xmpp.js

> These APIs support a wrapper for common events such as connect, disconnect, send. 
but for handling message-queue and route, broadcast, it needs to develop a custom layer for communicating with ejabberd API. 
 

 1. stanzaJS: Not sufficient explanation on API documents and few implementation and example. 
  it has to look into deep inside of code. https://github.com/legastero/stanza
 
 2. simple-xmpp: Wrapper of node-simple-xmpp. It uses deprecated API inside of the core module, 
  not able to make a connection with ejabberd server. https://github.com/simple-xmpp/node-simple-xmpp.git

 3. xmpp.js: xmpp.js is required to develop group-chat and broadcast by referring to the protocol document. https://github.com/xmppjs/xmpp.js.git
 

  It would need to define custom event and listener in the middleware which calls the ejabberd api for processing multi-user chat and user-related data.
  
  for example, ejabberd <---> middleware (custom event handler & ejabber api caller) <---> client 
  
  middleware. e.g. ejabberd-bridge: python. https://github.com/dirkmoors/pyejabberd.git
  
  ```python
  # Broadcasting
    def broadcast(msg):
        for user in users:
            xmpp.send(user, msg) # Something similar function is required for emitting the message to the client.
  ```

# RabbitMQ with Docker

## Docker

```
$ docker --version
$ docker pull rabbitmq:3-management
$ docker run -d -p 15672:15672 -p 5672:5672 --name rabbit-dev rabbitmq:3-management
```

or

After Switching Windows containers (Docker > Settings)

```
$ docker pull bitnami/rabbitmq:latest
$ docker run -d -p 15672:15672 -p 5672:5672 --name rabbit-dev bitnami/rabbitmq:latest
```

## RabbitMQ
http://localhost:15672/#/

The default login is 'guest guest'. If you are using bitnami, default is 'UserName:user/Password:bitnami'.

 - HostName: “localhost”
 - UserName: “guest”
 - Password: “guest”
 - Port: 5672

 https://medium.com/dev-genius/rabbitmq-with-docker-on-windows-in-30-minutes-172e88bb0808
 
## Install Docker on Windows Server 

Not able to find a proper solution using Linux containers in Windows server. Instead of docker, with installing it directly on Windows server is a better solution.

```powershell
$ Install-WindowsFeature containers
$ Install-Module -Name DockerMsftProvider -Repository PSGallery -Force
$ Install-Package -Name docker -ProviderName DockerMsftProvider -Force 
$ Start-Service docker  
$ Restart-Computer -Force
```

```powershell
## To switch to Linux Containers

$ [Environment]::SetEnvironmentVariable("LCOW_SUPPORTED", "1", "Machine")

# Enable Experimental Features in Dockerd daemon.conf
$configfile = @"
{
    "experimental": true
}
"@
$configfile | Out-File -FilePath C:\ProgramData\docker\config\daemon.json -Encoding ascii -Force
$ Restart-Service docker

# https://github.com/linuxkit/lcow/releases

$ Invoke-WebRequest -Uri "https://github.com/linuxkit/lcow/releases/download/v4.14.35-v0.3.9/release.zip" -UseBasicParsing -OutFile release.zip
$ Expand-Archive release.zip -DestinationPath "$Env:ProgramFiles\Linux Containers
$ docker run --rm -it --platform=linux ubuntu bash

## To switch back to Windows Containers

$ [Environment]::SetEnvironmentVariable("LCOW_SUPPORTED", $null, "Machine")
$ Restart-Service docker
```

# Socket.io specification

https://stackoverflow.com/questions/32674391/io-emit-vs-socket-emit/32675498

```javascript
socket.emit('message', "this is a test"); //sending to sender-client only
socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
io.emit('message', "this is a test"); //sending to all clients, include sender
io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
socket.emit(); //send to all connected clients
socket.broadcast.emit(); //send to all connected clients except the one that sent the message
socket.on(); //event listener, can be called on client to execute on server
io.sockets.socket(); //for emiting to specific clients
io.sockets.emit(); //send to all connected clients (same as socket.emit)
io.sockets.on() ; //initial connection from a client.

socket.emit will send back message to sender only,
io.emit will send message to all the client including sender
if you want to send message to all but not back to sender then socket.broadcast.emit
```

# The Commands for execution

- The Client

```
$ yarn start
```

- The Server

```
$ yarn nodemon server
```

- Deployment

```
$ yarn build
$ node server
```

Default Port is 8080. http://localhost:8080

![ref](./doc/socket_demo.gif?raw=true)

# References

Pros and Cons

- MQTT: IOT | Lightweight | Security vulnerabilities | IBM
- AMQP: JP Morgan | Binary | Erlang | Application Layer | RabbitMQ (Route/Queue/Publish-Subscribe/Topic) | Battery consuming issue on Mobile device | Application-wide notification
- XMPP: A Communication protocol for messaging | Application Layer | Security | XML based | Decentralization | Goolge Talk
- WebSocket: Full-duplex communication | Application Layer | Underlying TCP | Browser | Centralization

MQTT uses a more stream-orientated approach, making it easy for low-memory clients to write frames. AMQP uses a buffer-orientated approach, making possible high-performance servers.

https://stackoverflow.com/questions/23158842/using-rabbitmq-in-android-for-chat

https://stackoverflow.com/questions/6636213/rabbitmq-vs-socket-io

https://medium.com/@thinkwik/web-sockets-vs-xmpp-which-is-better-for-chat-application-113e3520b327
