# websocket-chat-spring-boot-angular
Chat application over websockets using Spring Boot and Angular. 
Two or more clients (browser tabs) can communicate with each other via websockets (STOMP).
Everything is secured by spring-security and spring-security-messaging.

Example:
User1 and User2 are logged in (subscribed to the /secured/topic/message topic).
They can send messages to the endpoint /secured/app/chat, which forwards the messages to the topic the clients are connected to.

![image](https://user-images.githubusercontent.com/52086629/185710085-19c04421-34fd-454d-ad5e-03ff9176615e.png)

