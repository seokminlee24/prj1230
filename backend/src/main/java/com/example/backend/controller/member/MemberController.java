package com.example.backend.controller.member;

import com.example.backend.dto.member.Member;
import com.example.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/member")
@RequiredArgsConstructor
@RestController
public class MemberController {
    final MemberService service;

    // 회원 가입
    @PostMapping("/signup")
    public void signup(@RequestBody Member member) {
        service.MemberAdd(member);
        System.out.println("member = " + member);
    }
}
