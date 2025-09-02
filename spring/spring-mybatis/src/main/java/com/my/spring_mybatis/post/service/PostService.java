package com.my.spring_mybatis.post.service;

import com.my.spring_mybatis.post.domain.PageDTO;
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

    public int createPost(PostDTO dto) {//글 등록 처리
        int n=postMapper.insertPost(dto);
        return n;
    }
    public PostDTO findPostById(int id){

        return postMapper.findPostById(id);
    }

    public int updatePost(PostDTO dto){//글 수정 처리
        return postMapper.updatePost(dto);
    }

    public int getTotalCount(PageDTO pageDTO) {
        return postMapper.getTotalCount(pageDTO);
    }

    public List<PostDTO> listPostPaging(PageDTO pageDTO) {
        return postMapper.listPostPaging(pageDTO);
    }

    public int deletePost(int id) {
        return 0;
    }
}
