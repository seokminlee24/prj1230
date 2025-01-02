package com.example.backend.service.member;

import com.example.backend.dto.member.Member;
import com.example.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    final MemberMapper mapper;
    final JwtEncoder jwtEncoder;

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

    // 회원 목록 요청
    public Member get(String memberId) {
        return mapper.selectById(memberId);
    }

    //회원 정보 보기에서 삭제
    public boolean remove(Member member) {
        int cnt = 0;

        // 기존 암호와 비교
        Member db = mapper.selectById(member.getMemberId());

        if (db != null) {
            if (db.getPassword().equals(member.getPassword())) {
                cnt = mapper.deleteById(member.getMemberId());
            }
        }
        return cnt == 1;
    }

    // 회원 정보 수정
    public boolean update(Member member) {
        int cnt = 0;
        Member db = mapper.selectById(member.getMemberId());
        if (db != null) {
            if (db.getPassword().equals(member.getOldPassword())) {
                cnt = mapper.update(member);
            }
        }
        return cnt == 1;
    }

    // 로그인
    public String token(Member member) {
        Member db = mapper.selectById(member.getMemberId());
        if (db != null) {
            if (db.getPassword().equals(member.getPassword())) {
                // token 만들어서 리턴
                JwtClaimsSet claims = JwtClaimsSet.builder()
                        .issuer("self")
                        .subject(member.getMemberId())
                        .issuedAt(Instant.now())
                        .expiresAt(Instant.now().plusSeconds(60 * 60 * 24 * 7))
//                        .claim("scope", "")
                        .build();
                return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
            }
        }

        return null;
    }
}
