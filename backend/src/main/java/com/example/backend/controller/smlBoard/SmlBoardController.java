package com.example.backend.controller.smlBoard;

import com.example.backend.dto.smlBoard.Board;
import com.example.backend.service.smlBoard.SmlBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class SmlBoardController {
    final SmlBoardService service;

    @PostMapping("/boardAdd")
    public void boardAdd(@RequestBody Board board, Authentication authentication) {
        service.boardAdd(board, authentication);
    }

}
