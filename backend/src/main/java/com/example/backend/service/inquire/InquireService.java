package com.example.backend.service.inquire;

import com.example.backend.dto.inquire.Inquire;
import com.example.backend.mapper.inquire.InquireMapper;
import com.example.backend.mapper.inquireComment.InquireCommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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

    public Map<String, Object> inquireList(Integer page, String searchType, String keyword) {
        //mapper.selectInquireAll();
        // SQL 의 LIMIT 키워드에서 사용되는 offset
        Integer offset = (page - 1) * 10;

        // 조회 문의글
        List<Inquire> inquireList = mapper.selectInquirePage(offset, searchType, keyword);

        // 전체 문의글 수
        Integer count = mapper.inquireCountAll(searchType, keyword);

        return Map.of("inquireList", inquireList, "count", count);
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
