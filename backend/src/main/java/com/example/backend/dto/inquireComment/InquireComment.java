package com.example.backend.dto.inquireComment;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InquireComment {
    private Integer inquireCommentId;
    private Integer inquireId;
    private String memberId;
    private String inquireComment;
    private LocalDateTime inserted;
    private String nickname;
}
