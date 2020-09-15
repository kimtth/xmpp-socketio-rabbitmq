# Attempts for finding a proper solution.

# XMPP Server

ejabberd (Most Popular XMPP server)

User: admin@localhost or admin@domain-name

Password: e.g. admin (User defined)

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

## The Commands for execution

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
