package com.example.backend.dto.smlBoard;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Board {
    private Integer boardId;
    private String boardTitle;
    private String boardContent;
    private String boardPlace;
    private String boardWriter;
    private LocalDateTime inserted;
    private String memberId;
    private Integer boardCountComment;
    private Integer boardCountJoin;
}
