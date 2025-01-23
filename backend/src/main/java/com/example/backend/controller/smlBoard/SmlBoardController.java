package com.example.backend.controller.smlBoard;

import com.example.backend.dto.smlBoard.Board;
import com.example.backend.service.smlBoard.SmlBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class SmlBoardController {
    final SmlBoardService service;

    @PostMapping("/boardAdd")
    public ResponseEntity<Map<String, Object>> boardAdd(@RequestBody Board board, Authentication authentication) {
        if (service.boardAdd(board, authentication)) {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success",
                                    "text", STR."\{board.getBoardId()}번 게시물이 등록되었습니다"),
                            "data", board));
        } else {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", Map.of("type", "warning",
                            "text", "게시물 등록이 실패하였습니다.")));
        }
    }

}
