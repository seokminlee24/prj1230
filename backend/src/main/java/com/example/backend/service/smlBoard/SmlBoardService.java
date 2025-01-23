package com.example.backend.service.smlBoard;

import com.example.backend.dto.smlBoard.Board;
import com.example.backend.mapper.smlBoard.SmlBoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class SmlBoardService {
    final SmlBoardMapper mapper;

    public boolean boardAdd(Board board, Authentication authentication) {
        board.setBoardWriter(authentication.getName());
        int cnt = mapper.insert(board);
        return cnt == 1;
    }

    public boolean validate(Board board) {
        boolean boardTitle = board.getBoardTitle().trim().length() > 0;
        boolean BoardContent = board.getBoardContent().trim().length() > 0;
        boolean BoardPlace = board.getBoardPlace().trim().length() > 0;

        return boardTitle && BoardContent && BoardPlace;
    }
}
