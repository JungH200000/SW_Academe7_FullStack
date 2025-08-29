package com.my.spring_mybatis.post.controller;

import com.my.spring_mybatis.post.domain.PostDTO;
import com.my.spring_mybatis.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@Slf4j
@RequestMapping("/posts")
@RequiredArgsConstructor //생성자 인젝션
public class PostController {
    
    //[1] 필드 인젝션
    //[2] 생성자 인젝션 : final + 멤버변수  @RequiredArgsConstructor
    private final PostService postService;

    /*
    * public PostController(PostService ps){
    *       this.postService=ps;
    * }
    * 롬복이 자동구성해주고 스프링은 이 생성자를 통해 의존성 객체를 주입한다
    * */


    @GetMapping("/mybatis")
    public String test(Model model){
        //posts 테이블의 게시글 수 가져오기
        int cnt = postService.testMyBatis();
        model.addAttribute("count",cnt);
        return "mybatisResult";
    }
    @GetMapping("")
    public String postList(Model model){
        List<PostDTO> postList= postService.listPost();
        model.addAttribute("postList", postList);
        return "post/list";
    }

}
