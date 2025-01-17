USE prj1230;

CREATE TABLE inquire_comment
(
    inquire_comment_id INT PRIMARY KEY AUTO_INCREMENT,
    inquire_id         INT          NOT NULL REFERENCES inquire (inquire_id),
    member_id          VARCHAR(50)  NOT NULL REFERENCES member (member_id),
    inquire_comment    VARCHAR(300) NOT NULL,
    inserted           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

SELECT *
FROM inquire_comment;

SELECT ic.inquire_comment_id,
       ic.inquire_id,
       ic.member_id AS memberId,
       m.nickname   AS nickname,
       ic.inquire_comment,
       ic.inserted
FROM prj1230.inquire_comment ic
         LEFT JOIN member m ON ic.member_id = m.member_id
WHERE ic.inquire_id