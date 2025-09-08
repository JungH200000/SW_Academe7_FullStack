package com.my.spring_security_jwt.post.repository;

import com.my.spring_security_jwt.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

//Spring Data JPA
@Repository
public interface PostRepsoitory extends JpaRepository<Post,Integer> {

    //[1] Query Method
    //[2] @Query JPQL or Native Query
    //[3] Named Query

    //[1] Query Method
    List<Post> findByTitle(String title);
    //select * from spring_posts where title=?

    List<Post> findByTitleContainingIgnoreCase(String title);
    //select * from spring_posts where title like '%검색어%'

    List<Post> findAllByOrderByIdDesc();
    //id내림차순 정렬
    //select * from spring_posts order by id desc
    //특정 글번호(id) 이상 글 검색
    List<Post> findByIdGreaterThanEqual(Integer id);
    //select * from spring_posts where id >= ?

//    [2] @Query    JPQL
    @Query("select p  from Post p where p.name like concat('%',:keyword,'%') or p.title like  concat('%',:keyword,'%')")
    List<Post> searchPosts(@Param("keyword") String keyword);

    //[2] Native Query  SQL  ==> nativeQuery=true 설정해야 함
    @Query(value = "select * from spring_posts where content like concat('%', :keyword,'%') limit :limit",
            nativeQuery = true)
    List<Post> searchPostsLimit(@Param("keyword") String keyword, @Param("limit") int limit);

    //[3] Named Query ==> Entity에 @NamedQuery(name="엔티티명.메서드명") 기술
    //이때 메서드명이 Repository의 메서명과 일치해야 한다

    @Query(name = "Post.getByName") //생략해도 됨.
    List<Post> getByName(@Param("name") String name);

}
