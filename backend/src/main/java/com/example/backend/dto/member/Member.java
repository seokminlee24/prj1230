package com.example.backend.dto.member;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Member {
    private String memberId;
    private String password;
    private String oldPassword; // 수정 하려고 할떄 확인하는 기능
    private String nickname;
    private String gender;
    private LocalDateTime inserted;
}
