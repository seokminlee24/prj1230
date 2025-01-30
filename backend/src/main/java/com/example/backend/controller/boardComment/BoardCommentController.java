package com.example.backend.controller.boardComment;

import com.example.backend.dto.boardComment.BoardComment;
import com.example.backend.service.boardComment.BoardCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boardComment")
@RequiredArgsConstructor
public class BoardCommentController {
    final BoardCommentService service;

    @DeleteMapping("/remove/{boardCommentId}")
    @PreAuthorize("isAuthenticated() or hasAuthority('SCOPE_admin')")
    public void remove(@PathVariable Integer boardCommentId, Authentication authentication) {
        if (service.isAdmin(authentication) || service.hasAccess(boardCommentId, authentication)) {
            service.remove(boardCommentId);
        }
    }

    @GetMapping("boardCommentList/{boardId}")
    public List<BoardComment> getBoardCommentList(@PathVariable Integer boardId) {
        return service.boardCommentList(boardId);
    }

    @PostMapping("boardCommentAdd")
    @PreAuthorize("isAuthenticated()")
    public void boardCommentAdd(@RequestBody BoardComment boardComment, Authentication authentication) {
        service.boardCommentAdd(boardComment, authentication);
    }
}
