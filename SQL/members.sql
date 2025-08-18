use kbDB;
show databases;
show tables;

--- members table 생성문
create table if not exists members( -- members table이 존재하지 않는다면
	id	int	primary	key	auto_increment, -- 회원 번호(PK)
    name	varchar(30) not null, -- 회원 이름
    email	varchar(50) not null unique, -- 이메일(로그인 시 아이디로 사용)
    passwd	varchar(100) not null, -- 비밀번호(암호화된 비밀번호)
    role varchar(30) not null default 'USER', -- USER 또는 ADMIN
    createdAt	date default(current_date()), -- 가입일
    refreshtoken varchar(512) default null -- 회원 인증 시 사용할 refreshtoken
);

desc members; -- desc: describe의 줄임말

-- 새로운 데이터 삽입: insert 문