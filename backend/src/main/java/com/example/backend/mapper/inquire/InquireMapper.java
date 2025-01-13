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
            SELECT i.inquire_id, i.inquire_category, i.inquire_title, i.inquire_content,i.inquire_writer AS memberId, m.nickname AS inquireWriter, i.inserted
            FROM prj1230.inquire i
            LEFT JOIN member m ON i.inquire_writer = m.member_id
            ORDER BY i.inquire_id DESC
            LIMIT #{offset}, 10
            """)
    List<Inquire> selectInquirePage(Integer offset);

    @Select("""
            SELECT COUNT(*)
            FROM prj1230.inquire
            """)
    Integer inquireCountAll();
}
