package com.example.backend.controller.inquireComment;

import com.example.backend.dto.inquireComment.InquireComment;
import com.example.backend.service.inquireComment.InquireCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inquireComment")
@RequiredArgsConstructor
public class InquireCommentController {
    final InquireCommentService service;

    @PostMapping("/inquireCommentAdd")
    @PreAuthorize("isAuthenticated()")
    public void inquireCommentAdd(InquireComment inquireComment, Authentication authentication) {
        service.inquireCommentAdd(inquireComment, authentication);
    }

}
