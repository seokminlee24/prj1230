package com.example.backend.mapper.boardComment;

import com.example.backend.dto.boardComment.BoardComment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardCommentMapper {

    @Insert("""
                INSERT INTO prj1230.board_comment
                    (board_id, member_id, board_comment) 
                VALUES (#{boardId},#{memberId},#{boardComment})
            """)
    int boardCommentInsert(BoardComment boardComment);
}
