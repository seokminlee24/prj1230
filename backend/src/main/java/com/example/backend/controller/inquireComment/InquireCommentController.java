package com.example.backend.controller.inquireComment;

import com.example.backend.dto.inquireComment.InquireComment;
import com.example.backend.service.inquireComment.InquireCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inquireComment")
@RequiredArgsConstructor
public class InquireCommentController {
    final InquireCommentService service;

    @PutMapping("inquireCommentEdit")
    @PreAuthorize("isAuthenticated() or hasAuthority('SCOPE_admin')")
    public ResponseEntity<Map<String, Object>> inquireCommentEdit(@RequestBody InquireComment inquireComment, Authentication authentication) {
        if (service.isAdmin(authentication) || service.hasAccess(inquireComment.getInquireCommentId(), authentication)) {
            if (service.inquireCommentUpdate(inquireComment)) {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success",
                                "text", "댓글이 수정되었습니다.")));
            } else {
                return ResponseEntity.internalServerError().body(Map.of("message",
                        Map.of("type", "error",
                                "text", "댓글이 수정되지 않았습니다.")));
            }
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    @DeleteMapping("/inquireCommentIdRemove/{inquireCommentId}")
    @PreAuthorize("isAuthenticated() or hasAuthority('SCOPE_admin')")
    public ResponseEntity<Map<String, Object>> inquireCommentIdRemove(@PathVariable Integer inquireCommentId, Authentication authentication) {
        if (service.isAdmin(authentication) || service.hasAccess(inquireCommentId, authentication)) {
            if (service.inquireCommentIdRemove(inquireCommentId)) {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success",
                                "text", "댓글이 삭제되었습니다.")));
            } else {
                return ResponseEntity.internalServerError().body(Map.of("message",
                        Map.of("type", "error",
                                "text", "댓글이 삭제되지 않았습니다.")));
            }
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    @GetMapping("/inquireList/{inquireId}")
    public List<InquireComment> inquireList(@PathVariable Integer inquireId) {
        return service.inquireList(inquireId);
    }

    @PostMapping("/inquireCommentAdd")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity<Map<String, Object>> inquireCommentAdd(@RequestBody InquireComment inquireComment, Authentication authentication) {
        if (service.isAdmin(authentication)) {
            service.inquireCommentAdd(inquireComment, authentication);
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "success",
                            "text", "새 댓글이 등록되었습니다.")));
        } else {
            return ResponseEntity.status(403).build();
        }
    }
}
