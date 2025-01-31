use prj1230;

CREATE TABLE board_join
(
    board_id  int REFERENCES sml_board (board_id),
    member_id VARCHAR(50) REFERENCES member (member_id),
    PRIMARY KEY (board_id, member_id)
);