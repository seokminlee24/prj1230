package com.example.backend.dto.inquireComment;

import lombok.Data;

@Data
public class InquireComment {
    private Integer inquireId;
    private String memberId;
    private String inquireContent;
}
