USE prj1230;

CREATE TABLE sml_board
(
    board_id      INT PRIMARY KEY AUTO_INCREMENT,
    board_title   VARCHAR(50)   NOT NULL,
    board_content VARCHAR(5000) NOT NULL,
    board_place   VARCHAR(250)  NOT NULL,
    board_writer  VARCHAR(50)   NOT NULL REFERENCES member (member_id),
    inserted      DATETIME DEFAULT CURRENT_TIMESTAMP
);

SELECT *
FROM sml_board;
DROP TABLE sml_board;