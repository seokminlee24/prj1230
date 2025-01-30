package com.example.backend.dto.boardComment;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardComment {
    private Integer BoardCommentId;
    private Integer BoardId;
    private String memberId;
    private String BoardComment;
    private LocalDateTime inserted;
    private String nickname;
}
