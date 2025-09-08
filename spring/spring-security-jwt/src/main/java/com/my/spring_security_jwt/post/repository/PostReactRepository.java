package com.my.spring_security_jwt.post.repository;

import com.my.spring_security_jwt.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostReactRepository extends JpaRepository<Post,Integer> {
    
    //QueryMethod like 검색 메서드
    Page<Post> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Post> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Post> findByContentContainingIgnoreCase(String content, Pageable pageable);

}
