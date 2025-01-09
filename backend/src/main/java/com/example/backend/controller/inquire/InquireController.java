package com.example.backend.controller.inquire;

import com.example.backend.dto.inquire.Inquire;
import com.example.backend.service.inquire.InquireService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/api/inquire")
@RestController
@RequiredArgsConstructor
public class InquireController {
    final InquireService service;

    // 문의글 수정
    @PutMapping("/inquireUpdate")
    public void inquireUpdate(@RequestBody Inquire inquire) {
        service.inquireUpdate(inquire);
    }

    // 문의글 삭제
    @DeleteMapping("/delete/{inquireId}")
    public ResponseEntity<Map<String, Object>> inquireDelete(@PathVariable int inquireId) {
        if (service.inquireRemove(inquireId)) {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success"
                            , "text", STR."\{inquireId}번 문의글이 삭제되었습니다.")));
        } else {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", Map.of("type", "error"
                            , "text", "문의글 삭제 중 문제가 발생하였습니다.")));
        }
    }

    // 문의글 보기
    @GetMapping("{inquireId}")
    public Inquire getInquire(@PathVariable Integer inquireId) {
        return service.getInquire(inquireId);
    }

    // 문의글 리스트
    @GetMapping("inquireList")
    public List<Inquire> inquireList() {
        return service.inquireList();
    }

    // 문의글 작성
    @PostMapping("inquireAdd")
    public ResponseEntity<Map<String, Object>> inquireAdd(@RequestBody Inquire inquire) {
        if (service.validate(inquire)) {
            if (service.inquireAdd(inquire)) {
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
