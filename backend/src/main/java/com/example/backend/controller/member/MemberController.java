package com.example.backend.controller.member;

import com.example.backend.dto.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/member")
@RequiredArgsConstructor
@RestController
public class MemberController {

    @PostMapping("/signup")
    public void signup(@RequestBody Member member) {
        System.out.println("member = " + member);
    }
}
