package com.example.backend.dto.smlBoard;

import lombok.Data;

@Data
public class Board {
    private String boardId;
    private String boardTitle;
    private String boardContent;
    private String boardPlace;
    private String boardWriter;
}
