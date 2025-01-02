package com.example.backend.service.member;

import com.example.backend.dto.member.Member;
import com.example.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    final MemberMapper mapper;

    //회원 가입
    public boolean MemberAdd(Member member) {
        int cnt = mapper.insert(member);
        return cnt == 1;
    }

    // 회원 가입 아이디 중복 체크
    public boolean checkId(String memberId) {
        return mapper.selectById(memberId) != null;
    }

    // 회원 가입 별명 중복 체크
    public boolean checkNickname(String nickname) {
        Member member = mapper.selectByNickName(nickname);
        return member != null;
    }

    // 회원 리스트
    public List<Member> list() {
        return mapper.selectAll();
    }

    public Member get(String memberId) {
        return mapper.selectById(memberId);
    }
}
