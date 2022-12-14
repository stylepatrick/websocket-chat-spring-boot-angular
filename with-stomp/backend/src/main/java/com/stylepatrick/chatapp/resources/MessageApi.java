package com.stylepatrick.chatapp.resources;

import com.stylepatrick.chatapp.models.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageApi {

    @MessageMapping("/chat")
    @SendTo("/secured/topic/messages")
    public Message send(Message message) {
        System.out.println(message);
        return message;
    }
}
