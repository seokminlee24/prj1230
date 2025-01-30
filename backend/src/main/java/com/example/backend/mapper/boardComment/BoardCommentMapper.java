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
            SELECT bc.board_comment_id,bc.board_id,bc.member_id AS member_id,m.nickname AS nickname,bc.board_comment,bc.inserted
            FROM prj1230.board_comment bc 
            LEFT JOIN member m ON bc.member_id = m.member_id
            WHERE bc.board_id=#{boardId}
            ORDER BY bc.board_comment_id DESC
            """)
    List<BoardComment> selectByBoardId(Integer boardId);
}
