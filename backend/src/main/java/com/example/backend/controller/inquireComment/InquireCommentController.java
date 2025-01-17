package com.example.backend.controller.inquireComment;

import com.example.backend.dto.inquireComment.InquireComment;
import com.example.backend.service.inquireComment.InquireCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquireComment")
@RequiredArgsConstructor
public class InquireCommentController {
    final InquireCommentService service;

    @PostMapping("/inquireCommentAdd")
    @PreAuthorize("isAuthenticated()")
    public void inquireCommentAdd(@RequestBody InquireComment inquireComment, Authentication authentication) {
        service.inquireCommentAdd(inquireComment, authentication);
    }

    @GetMapping("/inquireList/{inquireId}")
    public List<InquireComment> inquireList(@PathVariable Integer inquireId) {
        return service.inquireList(inquireId);
    }

}
