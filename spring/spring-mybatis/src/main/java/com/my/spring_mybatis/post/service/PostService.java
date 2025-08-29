package com.my.spring_mybatis.post.service;

import com.my.spring_mybatis.post.domain.PostDTO;
import com.my.spring_mybatis.post.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {

    private final PostMapper postMapper;

    public int testMyBatis(){
        log.info("postMapper={}",postMapper);
        return postMapper.testMyBatis();
    }

    public List<PostDTO> listPost() {
        return postMapper.listPost();
    }
}
