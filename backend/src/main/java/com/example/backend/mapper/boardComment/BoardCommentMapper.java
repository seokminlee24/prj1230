package com.example.backend.mapper.boardComment;

import com.example.backend.dto.boardComment.BoardComment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BoardCommentMapper {

    @Insert("""
                INSERT INTO prj1230.board_comment
                    (board_id, member_id, board_comment) 
                VALUES (#{boardId},#{memberId},#{boardComment})
            """)
    int boardCommentInsert(BoardComment boardComment);

    @Select("""
            SELECT board_comment_id,board_id,member_id,board_comment,inserted
            FROM prj1230.board_comment
            WHERE board_id=#{boardId}
            ORDER BY board_comment_id DESC
            """)
    List<BoardComment> selectByBoardId(Integer boardId);
}
