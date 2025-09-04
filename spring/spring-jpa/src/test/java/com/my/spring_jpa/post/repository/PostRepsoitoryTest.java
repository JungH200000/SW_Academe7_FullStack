package com.my.spring_jpa.post.repository;

import com.my.spring_jpa.post.domain.PostDTO;
import com.my.spring_jpa.post.entity.Post;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
//단위 테스트
@SpringBootTest
@Transactional
@Commit //테스트를 마치면 자동으로 롤백을 수행함. 결과를 보기 위해서 임시적으로  @Commit설정
class PostRepsoitoryTest {

    @Autowired
    private PostRepsoitory postRepsoitory;

    @BeforeEach
    public void print(){
        System.out.println("***********************");
    }

    @Test
    public void testFindByTitle(){
        List<Post> list=postRepsoitory.findByTitle("또 수정해요");
        System.out.println("검색 결과----------");
        list.stream().forEach((entity)->{
            PostDTO dto=PostDTO.fromEntity(entity);
            System.out.println(dto);
        });
    }

    @Test
    public void testFindByTitleLike(){
        List<Post> list=postRepsoitory.findByTitleContainingIgnoreCase("수정");
        list.stream().forEach((entity)->{
            PostDTO dto=PostDTO.fromEntity(entity);
            System.out.println(dto);
        });
    }
    
    @Test
    @DisplayName("글번호 내림차순 정렬")
    public void testFindAllOrderBy(){
        List<Post> list=postRepsoitory.findAllByOrderByIdDesc();
        list.stream().forEach((entity)->{
            PostDTO dto=PostDTO.fromEntity(entity);
            System.out.println(dto);
        });
    }
    @Test
    @DisplayName("글번호 id 이상 게시글 검색")
    public void testFindByIdGTE(){
        List<Post> list= postRepsoitory.findByIdGreaterThanEqual(1);
        list.stream().forEach((entity)->{
            PostDTO dto=PostDTO.fromEntity(entity);
            System.out.println(dto);
        });
    }
    @Test
    public void testSearchPosts(){
        List<Post> list = postRepsoitory.searchPosts("y");
        System.out.println("list.size(): "+list.size());
        list.stream().forEach((entity)->{
            PostDTO dto=PostDTO.fromEntity(entity);
            System.out.println(dto);
        });
    }

    @Test
    public void testSearchPostsLimit(){
        List<Post> list=postRepsoitory.searchPostsLimit("수정", 1);
        System.out.println("list.size(): "+list.size());
        list.stream().forEach((entity)->{
            PostDTO dto=PostDTO.fromEntity(entity);
            System.out.println(dto);
        });
    }

    @Test
    public void testGetByName(){
        List<Post> list=postRepsoitory.getByName("asdf@master.com");
        System.out.println("list.size(): "+list.size());
        list.stream().forEach((entity)->{
            PostDTO dto=PostDTO.fromEntity(entity);
            System.out.println(dto);
        });
    }

}