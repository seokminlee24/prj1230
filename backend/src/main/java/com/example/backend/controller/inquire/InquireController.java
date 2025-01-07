package com.example.backend.controller.inquire;

import com.example.backend.service.inquire.InquireService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/inquire")
@RestController
@RequiredArgsConstructor
public class InquireController {
    InquireService service;
}
