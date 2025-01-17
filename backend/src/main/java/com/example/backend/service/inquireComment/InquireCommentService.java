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

    public boolean inquireCommentIdRemove(Integer inquireCommentId) {
        int cnt = mapper.deleteByInquireCommentId(inquireCommentId);

        return cnt == 1;
    }

    public boolean inquireCommentUpdate(InquireComment inquireComment) {
        int cnt = mapper.inquireCommentUpdate(inquireComment);
        return cnt == 1;
    }

    public boolean isAdmin(Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities()
                .stream()
                .map(Object::toString)
                .anyMatch(authority -> authority.equals("SCOPE_admin")); // "SCOPE_admin" 권한을 확인

        // 디버깅 로그
        System.out.println("isAdmin 권한: " + isAdmin); // isAdmin 권한이 올바르게 설정되어 있는지 확인
        return isAdmin;
    }

    public boolean hasAccess(Integer inquireCommentId, Authentication authentication) {

        // 관리자는 모든 댓글을 수정/삭제할 수 있음
        if (isAdmin(authentication)) {
            return true; // 관리자에게는 항상 true 반환
        }

        InquireComment inquireComment = mapper.selectByInquireCommentId(inquireCommentId);

        return inquireComment.getMemberId().equals(authentication.getName());
    }
}
