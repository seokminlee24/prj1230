package com.example.backend.mapper.inquire;

import com.example.backend.dto.inquire.Inquire;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface InquireMapper {
    @Insert("""
                        INSERT INTO prj1230.inquire
                        (inquire_id,inquire_category,inquire_title,inquire_content,inquire_writer)
            VALUES (#{inquireId}, #{inquireCategory}, #{inquireTitle},#{inquireContent},#{inquireWriter})
            """)
    @Options(keyProperty = "inquireId", useGeneratedKeys = true)
    int insert(Inquire inquire);

    @Select("""
                SELECT *
                FROM prj1230.inquire
                ORDER BY inquire_id DESC
            """)
    List<Inquire> selectInquireAll();


    @Select("""
            SELECT i.inquire_id, i.inquire_category, i.inquire_title, i.inquire_content,i.inquire_writer AS memberId, m.nickname AS inquireWriter, i.inserted
            FROM prj1230.inquire i
            LEFT JOIN member m ON i.inquire_writer = m.member_id
            WHERE i.inquire_id = (#{inquireId})
            """)
    Inquire selectByInquireId(Integer inquireId);

    @Delete("""
            DELETE FROM inquire
            WHERE inquire_id = (#{inquireId})
            """)
    int inquireDeleteByInquireId(int inquireId);

    @Update("""
                    UPDATE inquire
                    set inquire_category=#{inquireCategory},
                        inquire_title=#{inquireTitle},
                        inquire_content=#{inquireContent}
                    WHERE inquire_id=#{inquireId}
            """)
    int inquireUpdate(Inquire inquire);

    @Select("""
            <script>
            SELECT i.inquire_id, i.inquire_category, i.inquire_title, i.inquire_content,i.inquire_writer AS memberId, m.nickname AS inquireWriter, i.inserted,COUNT(ic.inquire_id) AS inquireCountComment
            FROM prj1230.inquire i
            LEFT JOIN member m ON i.inquire_writer = m.member_id
            LEFT JOIN inquire_comment ic ON i.inquire_id = ic.inquire_id
            WHERE
                <trim prefixOverrides="OR">
                    <if test="searchType == 'all' or searchType == 'inquireTitle'">
                        inquire_title LIKE CONCAT('%', #{keyword}, '%')
                    </if>
                    <if test="searchType == 'all' or searchType == 'inquireContent'">
                        OR inquire_content LIKE CONCAT('%', #{keyword}, '%')
                    </if>
                </trim>
            GROUP BY i.inquire_id
            ORDER BY i.inquire_id DESC
            LIMIT #{offset}, 10
            </script>
            """)
    List<Inquire> selectInquirePage(Integer offset, String searchType, String keyword);

    @Select("""
             <script>
            SELECT COUNT(*)
            FROM prj1230.inquire
            WHERE
                <trim prefixOverrides="OR">
                    <if test="searchType == 'all' or searchType == 'inquireTitle'">
                        inquire_title LIKE CONCAT('%', #{keyword}, '%')
                    </if>
                    <if test="searchType == 'all' or searchType == 'inquireContent'">
                        OR inquire_content LIKE CONCAT('%', #{keyword}, '%')
                    </if>
                </trim>
             </script>
            """)
    Integer inquireCountAll(String searchType, String keyword);

    @Select("""
                SELECT inquire_id 
                FROM prj1230.inquire
                WHERE inquire_writer = #{memberId}
            """)
    List<Integer> selectByWriter(String memberId);
}
