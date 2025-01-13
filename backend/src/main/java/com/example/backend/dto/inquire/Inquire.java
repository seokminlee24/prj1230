package com.example.backend.dto.inquire;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Inquire {
    private int inquireId;
    private String inquireCategory;
    private String inquireTitle;
    private String inquireContent;
    private String inquireWriter;
    private String nickname;
    private LocalDateTime inserted;
}
