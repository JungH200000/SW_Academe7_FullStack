package com.my.spring_mybatis.post.controller;


import com.my.spring_mybatis.post.domain.PageDTO;
import com.my.spring_mybatis.post.domain.PostDTO;
import com.my.spring_mybatis.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
//# 리액트와 연동하기 위한  RestController
@RestController
@RequestMapping("/api/posts")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") 
//리액트 개발 서버 주소 지정. 지정하지 않으면 모든 요청(*) 허용함
// 매번 설정하기 번거롭다면 WebConfig 에 전역 cors를 설정해두면 된다. => WebConfig 클레스 참고
public class PostRestController {

    private final PostService postService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // -------------------- 게시글 목록 조회 --------------------
    @GetMapping
    public Map<String, Object> getPostList(PageDTO pageDTO) {
        pageDTO.setFindType(1);//1: title 로 검색 2: name, 3: content로 검색 (리액트에서는 title로만 검색)
        int totalCount = postService.getTotalCount(pageDTO);
        pageDTO.setTotalCount(totalCount);
        pageDTO.setPagingBlock(5);
        pageDTO.init();

        List<PostDTO> postList = postService.listPostPaging(pageDTO);

        Map<String, Object> result = new HashMap<>();
        result.put("data", postList);
        result.put("totalCount", pageDTO.getTotalCount());
        result.put("totalPages", pageDTO.getTotalPages());
        result.put("page", pageDTO.getPage());
        result.put("size", pageDTO.getSize());
        return result;
    }

    // -------------------- 게시글 상세 조회 --------------------
    @GetMapping("/{id}")
    public PostDTO getPostById(@PathVariable int id) {
        return postService.findPostById(id);
    }

    // -------------------- 게시글 등록 --------------------
    @PostMapping
    public Map<String, Object> createPost(@ModelAttribute PostDTO postDTO,
                                          @RequestParam(value = "file", required = false) MultipartFile file) {
        log.info("postDTO={}",postDTO);
        handleFileUpload(postDTO, file, null);
        int inserted = postService.createPost(postDTO);
        Map<String, Object> result = new HashMap<>();
        result.put("success", inserted > 0);
        return result;
    }

    // -------------------- 게시글 수정 --------------------
    @PutMapping("/{id}")
    public Map<String, Object> updatePost(@PathVariable int id,
                                          @ModelAttribute PostDTO postDTO,
                                          @RequestParam(value = "file", required = false) MultipartFile file) {
        postDTO.setId(id);
        // 기존 첨부파일명 전달 가능
        String oldAttach = postDTO.getAttach();
        handleFileUpload(postDTO, file, oldAttach);
        int updated = postService.updatePost(postDTO);
        Map<String, Object> result = new HashMap<>();
        result.put("success", updated > 0);
        return result;
    }

    // -------------------- 게시글 삭제 --------------------
    @DeleteMapping("/{id}")
    public Map<String, Object> deletePost(@PathVariable int id) {
        //String old_attach = postService.getAttachFile(id);
        String old_attach=null;
        int deleted = postService.deletePost(id);


        // 파일 삭제
        if (deleted > 0 && old_attach != null && !old_attach.isEmpty()) {
            File delFile = new File(uploadDir, old_attach);
            if (delFile.exists()) delFile.delete();
        }
        Map<String, Object> result = new HashMap<>();
        result.put("success", deleted > 0);
        return result;
    }

    // -------------------- 파일 업로드 처리 --------------------
    private void handleFileUpload(PostDTO postDTO, MultipartFile file, String oldAttach) {
        if (file != null && !file.isEmpty()) {
            String uuid = UUID.randomUUID().toString();
            String attachFile = uuid + "_" + file.getOriginalFilename();
            File saveFile = new File(uploadDir, attachFile);
            saveFile.getParentFile().mkdirs();
            try {
                file.transferTo(saveFile);
                postDTO.setAttach(attachFile);

                // 기존 파일 삭제
                if (oldAttach != null && !oldAttach.isEmpty()) {
                    File delFile = new File(uploadDir, oldAttach);
                    if (delFile.exists()) delFile.delete();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
