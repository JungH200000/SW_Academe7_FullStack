package com.my.spring_mybatis.post.controller;

import com.my.spring_mybatis.post.domain.PageDTO;
import com.my.spring_mybatis.post.domain.PostDTO;
import com.my.spring_mybatis.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Controller
@Slf4j
@RequestMapping("/posts")
@RequiredArgsConstructor //생성자 인젝션
public class PostController {
    
    
    //[1] 필드 인젝션
    //[2] 생성자 인젝션 : final + 멤버변수  @RequiredArgsConstructor
    private final PostService postService;
    
    @Value("${file.upload-dir}") //application.yml에 설정한 값을 주입
    private String uploadDir;

    /*
    * public PostController(PostService ps){
    *       this.postService=ps;
    * }
    * 롬복이 자동구성해주고 스프링은 이 생성자를 통해 의존성 객체를 주입한다
    * */
    @GetMapping("/form")
    public String postWriteForm(){

        return "/post/form";
        //resources/templates/post/form.html
    }
    @PostMapping("")
    public String postInsertUpdate(@ModelAttribute PostDTO dto,
                                   @RequestParam(name="file") MultipartFile mfile,
                                   @RequestParam(name="mode", defaultValue = "write") String mode){
        log.info("dto:  {}", dto);
        log.info("mode: {}", mode);
        boolean isEmpty = mfile.isEmpty();
        log.info("파일 첨부 여부: {}", isEmpty);
        log.info("파일 업로드 경로: {}", uploadDir);

        //파일 업로드 처리----------------
        if(!isEmpty){
            //첨부파일명 알아내기
            String origin=mfile.getOriginalFilename();//원본 파일명
            //String filename=new Date().getTime()+"_"+origin;//실제 저장할 파일명 (물리적 파일명)
            String uuid = UUID.randomUUID().toString();
            String filename = uuid+"_"+origin;
            log.info("첨부할 파일명: {}", filename);
            File saveFile=new File(uploadDir, filename);
            //업로드할 디렉토리가 없다면 만들어주자
            if(!saveFile.getParentFile().exists())
                saveFile.getParentFile().mkdirs();

            //파일 업로드 처리 transferTo(File 객체)
            try{
                ///////////////////////
                mfile.transferTo(saveFile);//파일 업로드 처리함
                /////////////////////////
                log.info("파일 업로드 성공");
                //dto객체에 업로드 파일명 설정
                dto.setAttach(filename);//=> DB에 첨부파일명 저장


            }catch (IOException ex){
                log.error("파일 업로드 중 에러: {}", ex.getMessage());
            }
        }//if----------

        //mode값 write==> insert문 수행
        //mode값 edit ===> update문 수행
        if(mode.equals("write")) {
            int n = postService.createPost(dto);
            log.info("글 등록 처리 n==={}", n);
        }else if(mode.equals("edit")){
            int n = postService.updatePost(dto);
            log.info("글 수정 처리 n==={}", n);
            //mode값이 edit일 경우 예전 첨부했던 파일이 있다면 삭제 처리
            if(n>0){ //글 수정 처리가 잘 됐다면
                String old_attach=dto.getOld_attach();
                File delFile=new File(uploadDir, old_attach);
                if(delFile.exists()){
                    boolean b=delFile.delete();//파일 삭제
                    log.info("파일 삭제 여부: {}",b);
                }//if---------
            }//if------
        }//else if----------------

        return "redirect:/posts";//게시글 목록페이지로 redirect방식으로 이동함
    }//---------------------------------------


    @GetMapping("/old") //페이징 처리하지 않을 경우
    public String postList(Model model){
        List<PostDTO> postList= postService.listPost();
        model.addAttribute("postList", postList);
        return "post/list";
    }//------------------------------------

    // /api/posts?page=2&size=5&query=검색어 ==>리액트
    // /posts?page=2&size=5&findType=1&findKeyword=검색어
    // 페이징 처리 관련 파라미터를 PageDTO가 받도록 처리하자
    // PageDTO 에서 페이징 관련 연산도 수행하자
    @GetMapping("")
    public String postListPage(@ModelAttribute PageDTO pageDTO, Model model){
        log.info("pageDTO==={}",pageDTO);//page번호
        //1. 총 게시물 수 구하기 or 검색한 게시글 수 구하기
        int totalCount = postService.getTotalCount(pageDTO);
        pageDTO.setTotalCount(totalCount);//총 게시글 수 설정
        pageDTO.setSize(5);//목록 글 개수 설정
        pageDTO.setPagingBlock(5);//페이징 블럭값 설정
        ///////////////
        pageDTO.init();//페이징 관련 연산 수행
        //init() 시점에 계산순서 잘 유지해야 함
        
        List<PostDTO> postList = postService.listPostPaging(pageDTO);//offset값 전달
        model.addAttribute("postList", postList);
        model.addAttribute("page", pageDTO.getPage());
        model.addAttribute("totalPages",pageDTO.getTotalPages());
        model.addAttribute("size", pageDTO.getSize());
        model.addAttribute("totalCount", totalCount);

        model.addAttribute("startPage", pageDTO.getStartPage());
        model.addAttribute("endPage", pageDTO.getEndPage());
        model.addAttribute("findType", pageDTO.getFindType());
        model.addAttribute("findKeyword", pageDTO.getFindKeyword());

        model.addAttribute("pageDTO", pageDTO);

//        return "post/list"; //페이징 처리 안할 경우
//        return "post/listPage";//페이징 처리할 경우 (페이징 블럭 없이)
        return "post/listPageBlock";//페이징 처리할 경우 (페이징 블럭 포함)
    }

    //글 내용 보기 ----------------
    @GetMapping("/{id}") //path variable
    public String postDetail(@PathVariable int id, Model model){
        log.info("id==={}", id);
        //조회수 증가
        PostDTO dto = postService.findPostById(id);
        model.addAttribute("dto", dto);

        return "post/detail";
    }
//    글내용 수정 입력 form -------------------
    @PostMapping("/edit")
    public String postEditForm(@RequestParam(name="id", defaultValue = "0") int id,
                               @RequestParam(name="attach") String attach,
                               Model model){
        if(id==0){
            return "redirect:/posts";
        }

        PostDTO dto=postService.findPostById(id);
        model.addAttribute("dto", dto);
        model.addAttribute("old_attach", attach);
        return "post/edit";
    }



    @GetMapping("/mybatis")
    public String test(Model model){
        //posts 테이블의 게시글 수 가져오기
        int cnt = postService.testMyBatis();
        model.addAttribute("count",cnt);
        return "mybatisResult";
    }

}
