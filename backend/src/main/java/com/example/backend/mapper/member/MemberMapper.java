package com.example.backend.mapper.member;

import com.example.backend.dto.member.Member;
import org.apache.ibatis.annotations.*;

import java.util.List;

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
            SELECT * FROM member
            WHERE member_id = #{memberId}
            """)
    Member selectById(String memberId);

    // 회원 가입 별명 중복 체크
    @Select("""
            SELECT * FROM member
            WHERE nickname=#{nickname}
            """)
    Member selectByNickName(String nickname);

    // 회원 리스트
    @Select("""
                    SELECT member_id,nickname,password,inserted
                    FROM member
                    ORDER BY inserted DESC 
            """)
    List<Member> selectAll();

    // 회원 정보 삭제
    @Delete("""
                            DELETE FROM member
                            WHERE member_id = #{memberId}
            """)
    int deleteById(String memberId);

    // 회원 정보 수정
    @Update("""
                        UPDATE member   
                        SET password = #{password},
                            nickname = #{nickname}
                        WHERE member_id = #{memberId}
            """)
    int update(Member member);

    @Select("""
            SELECT auth
            FROM auth
            WHERE admin_id = #{memberId}
            """)
    List<String> selectAuthByMemberId(String memberId);

    @Select("""
            <script>
            SELECT member_id,nickname,password,inserted
            FROM prj1230.member
            WHERE
                <trim prefixOverrides="OR">
                    <if test="searchType == 'all' or searchType == 'memberId'">
                        member_id LIKE CONCAT('%', #{searchType}, '%')
                    </if>
                    <if test="searchType == 'all' or searchType == 'nickname'">
                        OR nickname LIKE CONCAT('%', #{keyword}, '%')
                    </if>
                </trim>
            GROUP BY member_id
            ORDER BY member_id DESC
            LIMIT #{offset}, 10
             </script>
            """)
    List<Member> selectMemberPage(Integer offset, String searchType, String keyword);

    @Select("""
              <script>
             SELECT COUNT(*)
             FROM member
             WHERE 
                <trim prefixOverrides="OR">
                    <if test="searchType == 'all' or searchType == 'memberId'">
                        member_id LIKE CONCAT('%', #{searchType}, '%')
                    </if>
                    <if test="searchType == 'all' or searchType == 'nickname'">
                        OR nickname LIKE CONCAT('%', #{keyword}, '%')
                    </if>
                </trim>
              </script>
            """)
    Integer memberCountAll(String searchType, String keyword);
}
