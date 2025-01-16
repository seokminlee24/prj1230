package com.example.backend.mapper.inquireComment;

import com.example.backend.dto.inquireComment.InquireComment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InquireCommentMapper {

    @Insert("""
            INSERT INTO prj1230.inquire_comment
                (inquire_id,member_id,inquire_comment)
                VALUES (#{inquireId},#{memberId},#{inquireComment})
            """)
    int inquireCommentInsert(InquireComment inquireComment);
}
