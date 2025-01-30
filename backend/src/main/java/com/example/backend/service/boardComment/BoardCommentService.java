package com.example.backend.service.boardComment;

import com.example.backend.dto.boardComment.BoardComment;
import com.example.backend.mapper.boardComment.BoardCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardCommentService {
    final BoardCommentMapper mapper;

    public void boardCommentAdd(BoardComment boardComment, Authentication authentication) {
        boardComment.setMemberId(authentication.getName());

        mapper.boardCommentInsert(boardComment);
    }

    public List<BoardComment> boardCommentList(Integer boardId) {
        return mapper.selectByBoardId(boardId);
    }
}
