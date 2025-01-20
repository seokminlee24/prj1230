package com.example.backend.service.inquire;

import com.example.backend.dto.inquire.Inquire;
import com.example.backend.mapper.inquire.InquireMapper;
import com.example.backend.mapper.inquireComment.InquireCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class InquireService {
    final InquireMapper mapper;
    final InquireCommentMapper inquireCommentMapper;

    public boolean inquireAdd(Inquire inquire, Authentication authentication) {
        inquire.setInquireWriter(authentication.getName());
        int cnt = mapper.insert(inquire);
        return cnt == 1;
    }

    public Map<String, Object> inquireList(Integer page) {
        //mapper.selectInquireAll();
        mapper.selectInquirePage((page - 1) * 10);
        return Map.of("inquireList", mapper.selectInquirePage((page - 1) * 10), "count", mapper.inquireCountAll());
    }

    public Inquire getInquire(Integer inquireId) {
        return mapper.selectByInquireId(inquireId);
    }

    public boolean validate(Inquire inquire) {
        boolean inquireTitle = inquire.getInquireTitle().trim().length() > 0;
        boolean inquireContent = inquire.getInquireContent().trim().length() > 0;

        return inquireTitle && inquireContent;
    }

    public boolean inquireRemove(int inquireId) {
        //문의글 댓글 삭제
        inquireCommentMapper.deleteByInquireId(inquireId);

        // 문의글 삭제
        int cnt = mapper.inquireDeleteByInquireId(inquireId);
        return cnt == 1;
    }

    public boolean inquireUpdate(Inquire inquire) {
        int cnt = mapper.inquireUpdate(inquire);
        return cnt == 1;
    }

    public boolean hasAccess(int inquireId, Authentication authentication) {
        Inquire inquire = mapper.selectByInquireId(inquireId);
        // 디버깅용 출력
        System.out.println("DB MemberId: " + inquire.getMemberId());
        System.out.println("Authenticated User: " + authentication.getName());
        return inquire.getMemberId().equals(authentication.getName());
    }

    public boolean isAdmin(Authentication authentication) {
        return authentication.getAuthorities()
                .stream()
                .map(a -> a.toString())
                .anyMatch(s -> s.equals("SCOPE_admin"));
    }
}
