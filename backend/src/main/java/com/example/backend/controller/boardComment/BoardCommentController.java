package com.example.backend.controller.boardComment;

import com.example.backend.dto.boardComment.BoardComment;
import com.example.backend.service.boardComment.BoardCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/boardComment")
@RequiredArgsConstructor
public class BoardCommentController {
    final BoardCommentService service;

    @PutMapping("edit")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> edit(@RequestBody BoardComment boardComment) {
        if (service.update(boardComment)) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "success",
                            "text", "댓글이 수정되었습니다.")));
        } else {
            return ResponseEntity.internalServerError().body(Map.of("message",
                    Map.of("type", "error",
                            "text", "댓글이 수정되지 않았습니다.")));
        }
    }

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
    public ResponseEntity<Map<String, Object>> boardCommentAdd(@RequestBody BoardComment boardComment, Authentication authentication) {
        service.boardCommentAdd(boardComment, authentication);
        return ResponseEntity.ok().body(Map.of("message",
                Map.of("type", "success",
                        "text", "새 댓글이 등록되었습니다.")));

    }
}
