package com.example.backend.mapper.smlBoard;

import com.example.backend.dto.smlBoard.Board;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

@Mapper
public interface SmlBoardMapper {
    @Insert("""
            INSERT INTO sml_board
            (board_title,board_content,board_place,board_writer)
            values (#{boardTitle},#{boardContent},#{boardPlace},#{boardWriter})
            """)
    @Options(keyProperty = "boardId", useGeneratedKeys = true)
    int insert(Board board);
}
