package com.example.backend.service.inquireComment;

import com.example.backend.dto.inquireComment.InquireComment;
import com.example.backend.mapper.inquireComment.InquireCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class InquireCommentService {
    final InquireCommentMapper mapper;

    public void inquireCommentAdd(InquireComment inquireComment, Authentication authentication) {
        inquireComment.setMemberId(authentication.getName());

        mapper.inquireCommentInsert(inquireComment);
    }
}
