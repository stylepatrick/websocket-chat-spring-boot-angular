package com.stylepatrick.chatapp.services;

import com.stylepatrick.chatapp.models.Message;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.UUID;

@Configuration
@EnableScheduling
@AllArgsConstructor
public class MessageProducer {

    private final SimpMessagingTemplate simpMessagingTemplate;

    //@Scheduled(fixedRate = 3000)
    public void publishUpdates() {
        Message m = new Message("patrick", UUID.randomUUID().toString());
        System.out.println(m);
        simpMessagingTemplate.convertAndSend("/topic/messages", m);
    }
}
