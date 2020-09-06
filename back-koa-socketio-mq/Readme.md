
# RabbitMQ with Docker

## Docker
docker --version

docker pull rabbitmq:3-management

docker run -d -p 15672:15672 -p 5672:5672 --name rabbit-dev rabbitmq:3-management

## RabbitMQ
http://localhost:15672/#/

The default login is 'guest guest'

 - HostName: “localhost”
 - UserName: “guest”
 - Password: “guest”
 - Port: 5672

 https://medium.com/dev-genius/rabbitmq-with-docker-on-windows-in-30-minutes-172e88bb0808
 
