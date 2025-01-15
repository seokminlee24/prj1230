package com.example.backend.controller.inquire;

import com.example.backend.dto.inquire.Inquire;
import com.example.backend.service.inquire.InquireService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/api/inquire")
@RestController
@RequiredArgsConstructor
public class InquireController {
    final InquireService service;

    // 문의글 수정
    @PutMapping("/inquireUpdate")
    public ResponseEntity<Map<String, Object>> inquireUpdate(@RequestBody Inquire inquire) {
        if (service.validate(inquire)) {
            if (service.inquireUpdate(inquire)) {
                return ResponseEntity.ok()
                        .body(Map.of("message", Map.of("type", "success"
                                , "text", STR."\{inquire.getInquireId()}번 문의글이 수정되었습니다.")));
            } else {
                return ResponseEntity.internalServerError()
                        .body(Map.of("message", Map.of("type", "error"
                                , "text", "문의글 수정 중 문제가 발생하였습니다.")));
            }
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", Map.of("type", "warning",
                    "text", "제목이나 문의 내용이 비어있을 수 없습니다.")));
        }
    }

    // 문의글 삭제
    @DeleteMapping("/delete/{inquireId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> inquireDelete(@PathVariable int inquireId, Authentication authentication) {
        if (service.hasAccess(inquireId, authentication)) {
            if (service.inquireRemove(inquireId)) {
                return ResponseEntity.ok()
                        .body(Map.of("message", Map.of("type", "success"
                                , "text", STR."\{inquireId}번 문의글이 삭제되었습니다.")));
            } else {
                return ResponseEntity.internalServerError()
                        .body(Map.of("message", Map.of("type", "error"
                                , "text", "문의글 삭제 중 문제가 발생하였습니다.")));
            }
        } else {
            return ResponseEntity.status(403)
                    .body(Map.of("message", Map.of("type", "error"
                            , "text", "삭제 권한이 없습니다.")));
        }
    }

    // 문의글 보기
    @GetMapping("{inquireId}")
    public Inquire getInquire(@PathVariable Integer inquireId) {
        return service.getInquire(inquireId);
    }

    // 문의글 리스트
    @GetMapping("inquireList")
    public Map<String, Object> inquireList(@RequestParam(value = "page", defaultValue = "1") Integer page) {
        return service.inquireList(page);
    }

    // 문의글 작성
    @PostMapping("inquireAdd")
    public ResponseEntity<Map<String, Object>> inquireAdd(@RequestBody Inquire inquire, Authentication authentication) {
        if (service.validate(inquire)) {
            if (service.inquireAdd(inquire, authentication)) {
                return ResponseEntity.ok()
                        .body(Map.of("message", Map.of("type", "success",
                                        "text", STR."\{inquire.getInquireId()}번 게시물이 등록되었습니다"),
                                "data", inquire));
            } else {
                return ResponseEntity.internalServerError()
                        .body(Map.of("message", Map.of("type", "warning",
                                "text", "게시물 등록이 실패하였습니다.")));
            }
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", Map.of("type", "warning",
                    "text", "제목이나 문의 내용이 비어있을 수 없습니다.")));
        }
    }
}
