package com.example.backend.controller.member;

import com.example.backend.dto.member.Member;
import com.example.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/member")
@RequiredArgsConstructor
@RestController
public class MemberController {
    final MemberService service;

    // 로그인
    @PostMapping("login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Member member) {
        String token = service.token(member);
        if (token != null) {
            // 로그인 성공
            return ResponseEntity.ok(Map.of("token", token,
                    "message", Map.of("type", "success",
                            "text", "로그인 되었습니다.")));
        } else {
            // 로그인 실패
            return ResponseEntity.status(401)
                    .body(Map.of("message", Map.of("type", "warning",
                            "text", "아이디와 암호를 확인해주세요.")));
        }
    }

    // 회원 정보 보기에서 수정
    @PutMapping("update")
    @PreAuthorize("isAuthenticated() or hasAuthority('SCOPE_admin')")
    public ResponseEntity<Map<String, Object>> update(@RequestBody Member member,
                                                      Authentication authentication) {
        if (service.hasAccess(member.getMemberId(), authentication) || service.isAdmin(authentication)) {
            if (service.update(member)) {
                // 성공
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success",
                                "text", "회원정보를 수정하였습니다.")));
            } else {
                // 실패
                return ResponseEntity.badRequest()
                        .body(Map.of("message",
                                Map.of("type", "warning",
                                        "text", "정확한 정보를 입력해주세요.")));
            }
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    //회원 정보 보기에서 삭제
    @DeleteMapping("remove")
    @PreAuthorize("isAuthenticated() or hasAuthority('SCOPE_admin')")
    public ResponseEntity<Map<String, Object>> remove(@RequestBody Member member, Authentication authentication) {
        if (service.hasAccess(member.getMemberId(), authentication) || service.isAdmin(authentication)) {
            if (service.remove(member)) {
                // 성공
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success",
                                "text", "회원정보를 삭제하였습니다.")));
            } else {
                // 실패
                return ResponseEntity.badRequest()
                        .body(Map.of("message",
                                Map.of("type", "warning",
                                        "text", "정확한 정보를 입력해주세요.")));
            }
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    //회원 정보 보기
    @GetMapping("{memberId}")
    @PreAuthorize("isAuthenticated() or hasAuthority('SCOPE_admin')")
    public ResponseEntity<Member> getMember(@PathVariable String memberId, Authentication authentication) {

        if (service.hasAccess(memberId, authentication) || service.isAdmin(authentication)) {
            return ResponseEntity.ok(service.get(memberId));
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    //회원 리스트
    @GetMapping("list")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public Map<String, Object> list(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                    @RequestParam(value = "st", defaultValue = "all") String searchType,
                                    @RequestParam(value = "sk", defaultValue = "") String keyword) {

        System.out.println("searchType = " + searchType);
        System.out.println("keyword = " + keyword);
        return service.list(page, searchType, keyword);
    }

    // 회원 가입 아이디 중복 체크
    @GetMapping(value = "check", params = "memberId")
    public ResponseEntity<Map<String, Object>> checkId(@RequestParam String memberId) {
        if (memberId == null || memberId.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "아이디를 입력해주세요.")
            ));
        }

        if (service.checkId(memberId)) {
            // 이미 있으면
            return ResponseEntity.ok().body(Map.of(
                    "message", Map.of("type", "warning", "text", "이미 사용중인 아이디 입니다."),
                    "available", false)
            );
        } else {
            // 없으면
            return ResponseEntity.ok().body(Map.of(
                    "message", Map.of("type", "info", "text", "사용 가능한 아이디 입니다."),
                    "available", true));
        }
    }

    // 회원 가입 별명 중복 체크
    @GetMapping(value = "check", params = "nickname")
    public ResponseEntity<Map<String, Object>> checkNickname(@RequestParam String nickname) {
        if (nickname == null || nickname.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "별명을 입력해주세요.")
            ));
        }
        if (service.checkNickname(nickname)) {
            // 이미 있으면
            return ResponseEntity.ok().body(Map.of(
                    "message", Map.of("type", "warning", "text", "이미 사용중인 별명 입니다."),
                    "available", false)
            );
        } else {
            // 없으면
            return ResponseEntity.ok().body(Map.of(
                    "message", Map.of("type", "info", "text", "사용 가능한 별명 입니다."),
                    "available", true));
        }
    }

    // 회원 가입
    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody Member member) {
        System.out.println("member = " + member);

        // 오류 메시지를 담을 리스트
        List<String> errors = new ArrayList<>();

        // 비밀번호가 입력되지 않은 경우
        if (member.getPassword() == null || member.getPassword().trim().isEmpty()) {
            errors.add("비밀번호를 입력해 주세요");
        }

        // 성별이 선택되지 않은 경우
        if (member.getGender() == null || member.getGender().isEmpty()) {
            errors.add("성별을 선택해 주세요");
        }

        // 오류 메시지가 있으면 하나로 합쳐서 반환
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message",
                    Map.of("type", "warning",
                            "text", String.join(" 그리고 ", errors))));
        }

        try {
            if (service.MemberAdd(member)) {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success",
                                "text", "회원 가입되었습니다")));
            } else {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "error",
                                "text", "회원 가입 중 문제가 발생하였습니다.")));
            }
        } catch (DuplicateKeyException e) {
            return ResponseEntity.internalServerError().body(Map.of("message",
                    Map.of("type", "error",
                            "text", "이미 존재하는 아이디입니다.")));
        }
    }
}
