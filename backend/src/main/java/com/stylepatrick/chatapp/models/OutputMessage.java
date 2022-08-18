package com.stylepatrick.chatapp.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class OutputMessage {
    private String name;
    private String text;
    private String time;

}
