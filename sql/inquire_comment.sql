USE prj1230;

CREATE TABLE inquire_comment
(
    inquire_comment_id INT PRIMARY KEY AUTO_INCREMENT,
    inquire_id         INT          NOT NULL REFERENCES inquire (inquire_id),
    member_id          VARCHAR(50)  NOT NULL REFERENCES member (member_id),
    inquire_comment    VARCHAR(300) NOT NULL,
    inserted           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);