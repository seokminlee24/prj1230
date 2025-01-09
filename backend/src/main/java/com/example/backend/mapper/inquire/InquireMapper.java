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
            SELECT *
            FROM prj1230.inquire
            WHERE inquire_id = (#{inquireId})
            """)
    Inquire selectByInquireId(Integer inquireId);

    @Delete("""
            DELETE FROM inquire
            WHERE inquire_id = (#{inquireId})
            """)
    int inquireDeleteByInquireId(int inquireId);
}
