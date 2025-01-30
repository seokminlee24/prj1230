USE prj1230;

CREATE TABLE board_comment
(
    board_comment_id INT PRIMARY KEY AUTO_INCREMENT,
    board_id         INT          NOT NULL REFERENCES sml_board (board_id),
    member_id        VARCHAR(50)  NOT NULL REFERENCES member (member_id),
    board_comment    VARCHAR(300) NOT NULL,
    inserted         DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);