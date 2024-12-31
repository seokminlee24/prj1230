package com.example.backend.mapper.member;

import com.example.backend.dto.member.Member;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface MemberMapper {

    // 회원 가입
    @Insert("""
            INSERT INTO prj1230.member
            (member_id, password,nickname, gender)
            VALUES (#{memberId}, #{password}, #{nickname},#{gender})
            """)
    int insert(Member member);

    // 회원 가입 아이디 중복 체크
    @Select("""
            SELECT * FROM prj1230.member
            WHERE member_id = #{memberId}
            """)
    Member selectById(String memberId);
}
