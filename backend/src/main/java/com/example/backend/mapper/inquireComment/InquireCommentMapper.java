package com.example.backend.mapper.inquireComment;

import com.example.backend.dto.inquireComment.InquireComment;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface InquireCommentMapper {

    @Insert("""
                INSERT INTO prj1230.inquire_comment
                    (inquire_id, member_id, inquire_comment) 
                VALUES (#{inquireId},#{memberId},#{inquireComment})
            """)
    int insert(InquireComment inquireComment);

    @Select("""
                SELECT *
                FROM prj1230.inquire_comment
                WHERE inquire_id=#{inquireId}
                ORDER BY inquire_comment_id DESC
            """)
    List<InquireComment> selectByInquireId(int inquireId);

    @Select("""
            SELECT *
            FROM prj1230.inquire_comment
            WHERE inquire_comment_id=#{inquireCommentId}
            """)
    InquireComment selectByInquireCommentId(Integer inquireCommentId);

    @Delete("""
            DELETE FROM prj1230.inquire_comment
            WHERE inquire_comment_id=#{inquireCommentId}
            """)
    int deleteByInquireCommentId(Integer inquireCommentId);

    @Update("""
                    UPDATE prj1230.inquire_comment
                    SET inquire_comment = #{inquireComment}
                    WHERE inquire_comment_id=#{inquireCommentId}
            """)
    int inquireCommentUpdate(InquireComment inquireComment);
}
