package com.my.spring_security_jwt.post.controller;

import com.my.spring_security_jwt.post.domain.PostDTO;
import com.my.spring_security_jwt.post.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class PostRestController {

    @Autowired
    private PostService postService;
    
    @Value("${file.upload-dir}") //application.yml에 업로드 경로 설정값 주입
    private String uploadDir;



    //파일 업로드시에는 multipart/form-data로 전송. 리액트에서 FormData 객체로 전송
    @PostMapping("")
    public Map<String,Object> createPostFileUpload(@ModelAttribute PostDTO postDTO,
                                                   @RequestParam(name="file", required = false)MultipartFile mfile){
        log.info("postDTO={}",postDTO);
        //업로드 처리
        handleFileUpload(postDTO, mfile, null);
        PostDTO newPost = postService.savePost(postDTO);//DB에 insert작업
        String result=(newPost==null)?"fail":"success";
        String msg=(newPost==null)?"글 등록 실패":"글 등록 성공";
        return Map.of("result", result,"message",msg);
    }

    private void handleFileUpload(PostDTO postDTO, MultipartFile file, String oldAttach) {
        if (file != null && !file.isEmpty()) {
            String uuid = UUID.randomUUID().toString();
            String attachFile = uuid + "_" + file.getOriginalFilename();
            System.out.println("attachFile: "+attachFile);
            System.out.println("oldAttach: "+oldAttach);
            File saveFile = new File(uploadDir, attachFile);
            saveFile.getParentFile().mkdirs();
            try {
                file.transferTo(saveFile);
                postDTO.setAttach(attachFile);//물리적 파일명 =>DB에 insert시 필요

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

    @PostMapping("/test1")//json유형으로 받을 때 @RequestBody
    public PostDTO createPost(@RequestBody PostDTO postDTO){ //json유형으로 받을 때 @RequestBody
        log.info("postDTO=={}",postDTO);
        return postService.savePost(postDTO);
    }

    @GetMapping("/test1/old") //페이징 처리 없이 전체목록 가져올 때
    public Map<String, Object> getPostList(){
        List<PostDTO> postList =postService.getAllPosts();
        Map<String, Object> map=new HashMap<>();
        map.put("data",postList);
        map.put("totalCount", postList.size());
        map.put("totalPages", 1);
        map.put("page",1);
        map.put("size", 3);
        return map;
    }
//    ----게시글 목록 조회 (페이징) ----------------
    @GetMapping("")
    public Map<String, Object> getPostList(@RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "3") int size,
                                           @RequestParam(defaultValue = "0") int findType,
                                           @RequestParam(defaultValue = "") String keyword){
        Pageable pageable = PageRequest.of(page-1, size, Sort.by("id").descending());
                            //주의사항: page-1로 넘겨야함.  Pageable은 pageNumber를 0으로 넘기면 1페이지 보여둠

        Page<PostDTO> postPage = postService.getAllPosts(pageable,findType,keyword);

        Map<String, Object> map=new HashMap<>();
        map.put("data",postPage.getContent()); //게시글 목록
        map.put("totalCount", postPage.getTotalElements());// 총 게시글 수
        map.put("totalPages", postPage.getTotalPages());
        map.put("page",postPage.getNumber()+1);// +1 해야 함 (0부터 옴)
        map.put("size", postPage.getSize());
        return map;

    }
    @GetMapping("/{id}")
    public PostDTO getPostById(@PathVariable Integer id){
        log.info("id==={}",id);
        return postService.getPostById(id);
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deletePost(@PathVariable Integer id){
        postService.deletePost(id);
        return Map.of("result","success", "message","글 삭제 성공");
    }

    @PutMapping("/test1/{id}")  //json 데이터를 파라미터로 받을 경우
    public Map<String,Object> updatePost(@PathVariable Integer id, @RequestBody PostDTO postDTO){

        postDTO.setId(id);//글번호값 설정
        int n=postService.updatePost(postDTO);
        String result=(n>0)? "success":"fail";
        String message=(n>0)?"글 수정 성공":"글 수정 실패";
        return Map.of("result",result, "message", message);
    }
    @PutMapping("/{id}")  //multipart/form-data로 데이터 들어옴
    public Map<String,Object> updatePostFileUp(@PathVariable Integer id,
                                               @ModelAttribute PostDTO postDTO,
                                               @RequestParam("file") MultipartFile mfile){

        log.info("postDTO=={}",postDTO);
        log.info("mfile origin=={}", mfile.getOriginalFilename());
        //글번호로 기존 글내용 가져오기
        PostDTO tmp=postService.getPostById(id);//tmp에 예전 업로드 파일 가짐

        postDTO.setId(id);
        //기존 첨부파일명
        String oldAttach=tmp.getAttach();// postDTO.getAttach();
        System.out.println("oldAttach*************: "+oldAttach);
        handleFileUpload(postDTO,mfile,oldAttach);//파일 업로드 처리 및 기존 첨부파일 삭제 처리
        int n=postService.updatePost(postDTO);
        String result=(n>0)? "success":"fail";
        String message=(n>0)?"글 수정 성공":"글 수정 실패";
        return Map.of("result",result, "message", message);
    }
}
