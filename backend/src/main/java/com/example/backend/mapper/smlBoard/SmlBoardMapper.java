package com.example.backend.mapper.smlBoard;

import com.example.backend.dto.smlBoard.Board;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

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
                    select sb.board_id,sb.board_title,sb.board_content,sb.board_place,sb.board_writer AS memberId, m.nickname AS board_writer,sb.inserted
                    FROM sml_board sb
                    LEFT JOIN member m ON sb.board_writer = m.member_id
                    WHERE sb.board_id = #{boardId}
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

    @Select("""
                 <script>
                 SELECT sb.board_id,sb.board_title,sb.board_writer AS memberId, m.nickname AS board_writer,sb.inserted ,
            COUNT(DISTINCT bc.board_id) AS boardCountComment,COUNT(DISTINCT bj.member_id) boardCountJoin
                             FROM sml_board sb
                             LEFT JOIN member m ON sb.board_writer = m.member_id
                             LEFT JOIN board_comment bc ON sb.board_id = bc.board_id
                                LEFT JOIN board_join bj ON sb.board_id = bj.board_id
                             WHERE
                             <trim prefixOverrides="OR">
                                 <if test="searchType == 'all' or searchType == 'boardTitle'">
                                     board_title LIKE CONCAT('%', #{keyword}, '%')
                                 </if>
                                 <if test="searchType == 'all' or searchType == 'boardContent'">
                                     OR board_content LIKE CONCAT('%', #{keyword}, '%')
                                 </if>
                             </trim>
                             GROUP BY sb.board_id
                             ORDER BY sb.board_id DESC
                             LIMIT #{offset}, 10
                 </script>
            """)
    List<Board> selectBoardPage(Integer offset, String searchType, String keyword);

    @Select("""
             <script>
            SELECT COUNT(*)
            FROM prj1230.sml_board
            WHERE
                <trim prefixOverrides="OR">
                    <if test="searchType == 'all' or searchType == 'boardTitle'">
                        board_title LIKE CONCAT('%', #{keyword}, '%')
                    </if>
                    <if test="searchType == 'all' or searchType == 'boardContent'">
                        OR board_content LIKE CONCAT('%', #{keyword}, '%')
                    </if>
                </trim>
             </script>
            """)
    Integer boardCountAll(String searchType, String keyword);

    @Delete("""
                    DELETE FROM board_join
                    WHERE board_id = #{boardId}
                    AND member_id = #{name}
            """)
    int deleteJoinByBoardIdAndMemberId(Integer boardId, String name);

    @Insert("""
            INSERT INTO board_join
            VALUES (#{boardId}, #{name})
            """)
    int insertJoin(Integer boardId, String name);

    @Select("""
            SELECT COUNT(*)
            FROM board_join
            WHERE board_id = #{boardId}
            """)
    int countJoin(Integer boardId);

    @Select("""
            SELECT * 
            FROM board_join
            WHERE board_id = #{boardId}
              AND member_id = #{name}
            """)
    Map<String, Object> selectJoinByBoardIdAndMemberId(int boardId, String name);

    @Delete("""
            DELETE FROM board_join
            WHERE board_id = #{boardId}
            """)
    int deleteJoinByBoardId(int boardId);
}
