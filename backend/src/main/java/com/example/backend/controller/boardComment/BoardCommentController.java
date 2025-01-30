package com.example.backend.controller.boardComment;

import com.example.backend.dto.boardComment.BoardComment;
import com.example.backend.service.boardComment.BoardCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/boardComment")
@RequiredArgsConstructor
public class BoardCommentController {
    final BoardCommentService service;

    @PostMapping("boardCommentAdd")
    @PreAuthorize("isAuthenticated()")
    public void boardCommentAdd(@RequestBody BoardComment boardComment, Authentication authentication) {
        service.boardCommentAdd(boardComment, authentication);
    }
}
