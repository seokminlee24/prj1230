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
                SELECT ic.inquire_comment_id, ic.inquire_id, ic.member_id AS memberId, m.nickname AS nickname, ic.inquire_comment,ic.inserted
                FROM prj1230.inquire_comment ic
                LEFT JOIN member m ON ic.member_id = m.member_id
                LEFT JOIN inquire I ON ic.inquire_id = I.inquire_id
                WHERE ic.inquire_id=#{inquireId}
                ORDER BY ic.inquire_comment_id DESC
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

    @Delete("""
                DELETE FROM prj1230.inquire_comment
                WHERE inquire_id=#{inquireId}
            """)
    int deleteByInquireId(int inquireId);
}
