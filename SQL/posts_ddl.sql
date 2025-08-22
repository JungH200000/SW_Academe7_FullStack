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
desc posts;

select * from members order by id desc;
select * from posts order by id desc;

insert into posts(name,title,content)
values('choi@naver.com','처음 쓰는 글','반가워요');

insert into posts(name,title,content)
values('dooly@a.b.c','  둘리글','반가워요');

insert into posts(name,title,content)
values('askljdflkjs@naver.com','처음 쓰는 글','반가워요');

-- 09:24:36	insert into posts(name,title,content) 
-- values('askljdflkjs@naver.com','처음 쓰는 글','반가워요')	
-- Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`kbdb`.`posts`, CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`name`) REFERENCES `members` (`email`) ON DELETE CASCADE)	0.000 sec

delete from members where email='choi@naver.com';

select * from members;
select * from posts order by id desc;

select count(id) as count from posts;
select count(*) from posts;