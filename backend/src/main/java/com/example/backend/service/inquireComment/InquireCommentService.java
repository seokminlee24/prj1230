package com.example.backend.service.inquireComment;

import com.example.backend.dto.inquireComment.InquireComment;
import com.example.backend.mapper.inquireComment.InquireCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class InquireCommentService {
    final InquireCommentMapper mapper;

    public void inquireCommentAdd(InquireComment inquireComment, Authentication authentication) {
        inquireComment.setMemberId(authentication.getName());
        System.out.println("inquireId = " + inquireComment.getInquireId());
        System.out.println("authentication = " + authentication.getName());
        System.out.println("inquireComment = " + inquireComment.getInquireComment());

        mapper.insert(inquireComment);
    }

    public List<InquireComment> inquireList(Integer inquireId) {
        return mapper.selectByInquireId(inquireId);
    }
}
