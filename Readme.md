
# RabbitMQ with Docker

## Docker
$ docker --version

$ docker pull rabbitmq:3-management

$ docker run -d -p 15672:15672 -p 5672:5672 --name rabbit-dev rabbitmq:3-management

or

After Switching Windows containers (Docker > Settings)

$ docker pull bitnami/rabbitmq:latest

$ docker run -d -p 15672:15672 -p 5672:5672 --name rabbit-dev bitnami/rabbitmq:latest

## RabbitMQ
http://localhost:15672/#/

The default login is 'guest guest'. If you are using bitnami, default is 'UserName:user/Password:bitnami'.

 - HostName: “localhost”
 - UserName: “guest”
 - Password: “guest”
 - Port: 5672

 https://medium.com/dev-genius/rabbitmq-with-docker-on-windows-in-30-minutes-172e88bb0808
 
