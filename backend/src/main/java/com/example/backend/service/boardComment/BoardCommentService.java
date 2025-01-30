package com.example.backend.service.boardComment;

import com.example.backend.mapper.boardComment.BoardCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardCommentService {
    final BoardCommentMapper mapper;
}
