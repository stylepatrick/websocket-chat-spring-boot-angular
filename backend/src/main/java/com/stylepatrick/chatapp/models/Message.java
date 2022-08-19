package com.stylepatrick.chatapp.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class Message {
    private String name;
    private String text;
    private Date time;

}
