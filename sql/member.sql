USE prj1230;

CREATE TABLE member
(
    member_id VARCHAR(50) PRIMARY KEY,                                  -- 회원 ID
    password  VARCHAR(50)        NOT NULL,                              -- 비밀번호
    name      VARCHAR(50)        NOT NULL,                              -- 이름
    nickname  VARCHAR(50) UNIQUE NOT NULL,                              -- 닉네임 (유일)
    gender    CHAR(1)            NOT NULL CHECK (gender IN ('M', 'F')), -- 성별 ('M' 또는 'F'만 허용)
    inserted  DATETIME DEFAULT CURRENT_TIMESTAMP                        -- 가입 시간 (기본값: 현재 시간)
);

SELECT *
FROM member;

DESCRIBE member;