package com.example.backend.controller.smlBoard;

import com.example.backend.service.smlBoard.SmlBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class SmlBoardController {
    final SmlBoardService service;


}
