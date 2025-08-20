use kbdb;

select *from members order by id desc;  -- 회원번호 내림차순

/* 포맷 문자열
%Y : 년도 4자리 / %y : 년도 2자리
%m : 월 (숫자) / %M : 월 (영어)
%d : 일 (숫자) / %D : 일 (숫자th)
%H : 시간 (24시간)
%i : 분
%s : 초
*/
select id , name, email, role , date_format(createdAt, '%Y-%m-%d') 'createdAt'
from members order by id desc;

/* WGHO 순서로 옴
where > group by > having > order by
*/
select id , name, email, role , date_format(createdAt, '%Y-%m-%d') 'createdAt'
from members
where id=3;

-- role이 ADMIN인 회원 정보
select * from members
where role='ADMIN';

-- 로그인
-- email, passwd 일치 여부
-- gam@examle.com
select * from members
where email='gam@examle.com';

-- and, or 연산자
select * from members
where email='gam@examle.com' and passwd='1234';

-- 2025-08-20 전에 가입한 사람
select * from members
where createdAt < '2025-08-20';
-- 내림차순 order by createdAt desc 추가

-- 회원번호가 1, 3, 4번인 회원의 id, 이름, 이메일을 출력
-- 단, 이름을 가나다 순으로 정렬하고, 동일한 이름이 있을 때는 회원번호를 내림차 순으로 정렬
select id, name, email from members
where id in(1, 3, 4)
order by name, id desc;

-- 검색
-- 이름 중 '아'를 가지고 있는 회원들만 보여라
select * from members
where name like '%아%';
-- '=' : 값이 같은지 비교. 정확하게 같아야 함

-- refreshtoken이 null 값을 갖는 회원 정보를 보여라
-- null 값 여부를 비교할 경오 등가 연산자 '=' 사용 금지
-- 'is null' / 'is not null'로 비교
select * from members
where refreshtoken is null;

-- -------------------------------
/* delete 문
- delete from 테이블명 where 조건절; ==> 조건에 맞는 데이터를 삭제
- delete from 테이블명; ==> 모든 데이터 삭제
*/
select @@autocommit;
-- @@autocommit 값이 1 => auto commit으로 설정

-- 이 블록을 한 번에 실행해 보세요.
SET @@autocommit = 0;
START TRANSACTION;

delete from members where id = 12;

select * from members;

rollback; -- TCL (commit/rollback)

select * from members;

delete from members where name = '감성';
select * from members;
commit;
select * from members;
rollback;
select * from members;
commit;

-- --------------------
/*
UPDATE문
- update 테이블명 set column명1='값1', column명2='값2', ...; => 모든 데이터 수정 처리
- update 테이블명 set column명1='값1', column명2='값2', ... where 조건절; => 조건에 맞는 데이터를 수정 처리
*/
update members 
set name='홍사', email='hhh@ab.com', passwd='222', role='guest', createdAt=(current_date())
where id=1;

select * from members;
rollback;

set @@autocommit = 1;