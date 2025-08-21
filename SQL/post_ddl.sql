-- posts_ddl.sql
use kbdb;

drop table if exists posts;

create table if not exists posts(
   id int primary key auto_increment, -- 글번호
    name varchar(50) not null, -- 작성자 foreign key members(email) 참조 예정
   title varchar(200) not null, -- 글제목
    content text, -- 글내용
    attach varchar(255), -- 첨부파일명
    wdate datetime default current_timestamp,
    -- 제약조건
    foreign key (name) references members(email) on delete cascade
);
-- 외래키 제약조건 : 부모(members)       자식(posts)  