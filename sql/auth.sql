USE prj1230;
CREATE TABLE auth
(
    admin_id VARCHAR(50) REFERENCES member (member_id),
    auth     VARCHAR(50) NOT NULL,
    PRIMARY KEY (admin_id, auth)
);

# 어드민 아이디
INSERT INTO auth (auth.admin_id, auth)
VALUES ('leedero', 'admin');

INSERT INTO auth (auth.admin_id, auth)
VALUES ('lee', 'admin');

SELECT *
FROM auth;