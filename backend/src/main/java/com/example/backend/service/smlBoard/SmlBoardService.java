package com.example.backend.service.smlBoard;

import com.example.backend.dto.smlBoard.Board;
import com.example.backend.mapper.boardComment.BoardCommentMapper;
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

    private final BoardCommentMapper boardCommentMapper;


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
        // 댓글 지우기
        boardCommentMapper.deleteByBoardId(boardId);

        // 좋아요 지우기
        mapper.deleteJoinByBoardId(boardId);

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

    public Map<String, Object> join(Board board, Authentication authentication) {
        int cnt = mapper.deleteJoinByBoardIdAndMemberId(board.getBoardId(), authentication.getName());

        if (cnt == 0) {
            mapper.insertJoin(board.getBoardId(), authentication.getName());

        }

        int countJoin = mapper.countJoin(board.getBoardId());

        Map<String, Object> result = Map.of("join", (cnt == 0), "count", countJoin);

        return result;
    }

    public Map<String, Object> getJoin(int boardId, Authentication authentication) {
        boolean join = false;
        if (authentication != null) {
            Map<String, Object> row = mapper.selectJoinByBoardIdAndMemberId(boardId, authentication.getName());
            if (row != null) {
                join = true;
            }
        }
        int countJoin = mapper.countJoin(boardId);
        Map<String, Object> result = Map.of("join", join, "count", countJoin);
        return result;
    }


    public Map<String, Object> joinList(String memberId, Integer page) {
        Integer offset = (page - 1) * 10;
        List<Board> list = mapper.selectJoinBoardPage(memberId, offset);

        // 전체 문의글 수
        Integer count = mapper.boardJoinCount(memberId);
        return Map.of("list", list, "count", count);
    }
}
