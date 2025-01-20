CREATE TABLE inquire
(
    inquire_id       INT PRIMARY KEY AUTO_INCREMENT,                       -- 문의 고유 ID
    inquire_category VARCHAR(50)   NOT NULL,                               -- 문의 유형 (카테고리)
    inquire_title    VARCHAR(50)   NOT NULL,                               -- 문의 제목
    inquire_content  VARCHAR(5000) NOT NULL,                               -- 문의 내용
    inquire_writer   VARCHAR(50)   NOT NULL REFERENCES member (member_id), -- 작성자 (member 테이블의 member_id 참조)
    inserted         DATETIME DEFAULT CURRENT_TIMESTAMP                    -- 작성 일자 (기본값: 현재 타임스탬프)
);

SELECT *
FROM inquire
WHERE inquire_id = 76;

SELECT *
from inquire;

DROP TABLE inquire;