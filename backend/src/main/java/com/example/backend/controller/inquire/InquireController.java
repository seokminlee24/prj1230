package com.example.backend.controller.inquire;

import com.example.backend.dto.inquire.Inquire;
import com.example.backend.service.inquire.InquireService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/inquire")
@RestController
@RequiredArgsConstructor
public class InquireController {
    final InquireService service;

    // 문의글 작성
    @PostMapping("inquireAdd")
    public void inquireAdd(@RequestBody Inquire inquire) {
        service.inquireAdd(inquire);
    }

    // 문의글 리스트
    @GetMapping("inquireList")
    public List<Inquire> inquireList() {
        return service.inquireList();
    }
}
