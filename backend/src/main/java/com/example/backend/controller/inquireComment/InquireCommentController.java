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

    @DeleteMapping("/inquireCommentIdRemove/{inquireCommentId}")
    @PreAuthorize("isAuthenticated() or hasAuthority('SCOPE_admin')")
    public void inquireCommentIdRemove(@PathVariable Integer inquireCommentId, Authentication authentication) {
        if (service.hasAccess(inquireCommentId, authentication)) {
            service.inquireCommentIdRemove(inquireCommentId);
        }
    }

    @GetMapping("/inquireList/{inquireId}")
    public List<InquireComment> inquireList(@PathVariable Integer inquireId) {
        return service.inquireList(inquireId);
    }

    @PostMapping("/inquireCommentAdd")
    @PreAuthorize("isAuthenticated() or hasAuthority('SCOPE_admin')")
    public ResponseEntity<Map<String, Object>> inquireCommentAdd(@RequestBody InquireComment inquireComment, Authentication authentication) {
        service.inquireCommentAdd(inquireComment, authentication);
        return ResponseEntity.ok().body(Map.of("message",
                Map.of("type", "success",
                        "text", "새 댓글이 등록되었습니다.")));
    }
}
