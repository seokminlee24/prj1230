package com.example.backend.mapper.smlBoard;

import com.example.backend.dto.smlBoard.Board;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface SmlBoardMapper {
    @Insert("""
            INSERT INTO sml_board
            (board_title,board_content,board_place,board_writer)
            values (#{boardTitle},#{boardContent},#{boardPlace},#{boardWriter})
            """)
    @Options(keyProperty = "boardId", useGeneratedKeys = true)
    int insert(Board board);

    @Select("""
                SELECT sb.board_id,sb.board_title,sb.board_writer AS memberId, m.nickname AS board_writer,sb.inserted 
                FROM sml_board sb
                LEFT JOIN member m ON sb.board_writer = m.member_id
                ORDER BY sb.board_id DESC
            """)
    List<Board> selectBoardAll();

    @Select("""
                    select *
                    FROM sml_board
                    WHERE board_id = #{boardId}
            """)
    Board selectByBoardId(int boardId);

    @Delete("""
                    DELETE FROM sml_board
                    WHERE board_id = #{boardId}
            """)
    int deleteBoardId(int boardId);

    @Update("""
            UPDATE sml_board
            SET board_title = #{boardTitle},
                board_content = #{boardContent},
                board_place = #{boardPlace}
            WHERE board_id = #{boardId}
            """)
    int boardUpdate(Board board);
}
