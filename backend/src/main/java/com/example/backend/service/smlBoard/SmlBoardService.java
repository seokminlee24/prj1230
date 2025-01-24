package com.example.backend.service.smlBoard;

import com.example.backend.dto.smlBoard.Board;
import com.example.backend.mapper.smlBoard.SmlBoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class SmlBoardService {
    final SmlBoardMapper mapper;

    public boolean boardAdd(Board board, Authentication authentication) {
        board.setBoardWriter(authentication.getName());
        int cnt = mapper.insert(board);
        return cnt == 1;
    }

    public boolean validate(Board board) {
        boolean boardTitle = board.getBoardTitle().trim().length() > 0;
        boolean BoardContent = board.getBoardContent().trim().length() > 0;
        boolean BoardPlace = board.getBoardPlace().trim().length() > 0;

        return boardTitle && BoardContent && BoardPlace;
    }

    public Map<String, Object> list(Integer page, String searchType, String keyword) {
        // SQL 의 LIMIT 키워드에서 사용되는 offset
        Integer offset = (page - 1) * 10;

        // 조회 문의글
        List<Board> list = mapper.selectBoardPage(offset, searchType, keyword);

        // 전체 문의글 수
        Integer count = mapper.boardCountAll(searchType, keyword);

        return Map.of("list", list, "count", count);
    }

    public Board get(int boardId) {
        return mapper.selectByBoardId(boardId);
    }

    public boolean boardRemove(int boardId) {
        int cnt = mapper.deleteBoardId(boardId);
        return cnt == 1;
    }

    public boolean boardUpdate(Board board) {
        int cnt = mapper.boardUpdate(board);
        return cnt == 1;
    }

    public boolean hasAccess(Integer boardId, Authentication authentication) {
        Board board = mapper.selectByBoardId(boardId);
        // 디버깅용 출력
        System.out.println("DB MemberId: " + board.getMemberId());
        System.out.println("Authenticated User: " + authentication.getName());
        return board.getMemberId().equals(authentication.getName());
    }

    public boolean isAdmin(Authentication authentication) {
        return authentication.getAuthorities()
                .stream()
                .map(a -> a.toString())
                .anyMatch(s -> s.equals("SCOPE_admin"));
    }
}
