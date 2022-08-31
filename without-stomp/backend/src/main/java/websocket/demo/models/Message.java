package websocket.demo.models;

import lombok.AllArgsConstructor;

import java.util.Date;

@AllArgsConstructor
public class Message {
    private String name;
    private String text;
    private Date time;
}
