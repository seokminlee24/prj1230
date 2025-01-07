package com.example.backend.mapper.inquire;

import com.example.backend.dto.inquire.Inquire;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InquireMapper {
    @Insert("""
                        INSERT INTO prj1230.inquire
                        (inquire_id,inquire_category,inquire_title,inquire_content,inquire_writer)
            VALUES (#{inquireId}, #{inquireCategory}, #{inquireTitle},#{inquireContent},#{inquireWriter})
            """)
    int insert(Inquire inquire);
}
