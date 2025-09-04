package com.my.spring_jpa.post.service;

import com.my.spring_jpa.post.domain.PostDTO;
import com.my.spring_jpa.post.entity.Post;
import com.my.spring_jpa.post.repository.PostReactRepository;
import com.my.spring_jpa.post.repository.PostRepsoitory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional //Dirty-Checking(변경 감지)는 트랜잭션 안에서만 동작
public class PostService {

    private final PostReactRepository postRepsoitory;

    //Spring Data JPA
    //조회. findAll()
    public List<PostDTO> getAllPosts(){
        //List<Post> entityList=postRepsoitory.findAll(); //기본 오름차순
        List<Post> entityList = postRepsoitory.findAll(Sort.by(Sort.Direction.DESC,"id"));

        List<PostDTO> dtoList=entityList.stream().map(PostDTO::fromEntity).collect(Collectors.toList());
        return dtoList;
    }
    public Page<PostDTO> getAllPosts(Pageable pageable,int findType, String keyword){
        Page<Post> entityPage=null;
        if(findType==0||keyword==null||keyword.equals("")){
            entityPage = postRepsoitory.findAll(pageable);// 전체 검색
        }else if(findType==1){// title
            entityPage = postRepsoitory.findByTitleContainingIgnoreCase(keyword,pageable);
        }else if(findType==2){
            entityPage = postRepsoitory.findByNameContainingIgnoreCase(keyword,pageable);
        }else if(findType==3) {
            entityPage = postRepsoitory.findByContentContainingIgnoreCase(keyword,pageable);
        }else{
            entityPage=Page.empty();
        }
        return entityPage.map(PostDTO::fromEntity);
    }

    //저장 save(Entity)
    public PostDTO savePost(PostDTO postDTO) {
        Post newPost = postRepsoitory.save(postDTO.toEntity());
        return PostDTO.fromEntity(newPost);
    }

    //삭제 deleteById(pk), delete(entity), deleteAll()
    public void deletePost(Integer id) {
        //해당 글 조회
        Optional<Post> opt=postRepsoitory.findById(id);
        Post findPost=opt.orElseThrow(()->new RuntimeException("Post not found"));
        postRepsoitory.delete(findPost);
        //postRepsoitory.deleteById(id);
    }

    //게시글 상세 조회 (글번호로 조회) Optional<T> findById(pk)
    public PostDTO getPostById(Integer id){
        Post entity= postRepsoitory.findById(id)
                .orElseThrow(()->new RuntimeException("Post not found"));
        return PostDTO.fromEntity(entity);
    }

    //게시글 수정 : [1] save(entity) 
    //[2] or 글번호로 검색한 후=> 검색한 엔티티의 setter를 호출해서 수정값 전달
    @Transactional //트랜잭션 보장
    public int updatePost(PostDTO postDTO){
        Post entity = postRepsoitory.findById(postDTO.getId())
                .orElseThrow(()->new RuntimeException("게시글이 없습니다"));
        //필요할 필드만 수정
        entity.setName(postDTO.getName());
        entity.setTitle(postDTO.getTitle());
        entity.setContent(postDTO.getContent()); //setter호출후 commit-> update문 실행
        entity.setAttach(postDTO.getAttach());
        //entity.setWdate(LocalDateTime.now());
//        entity.setAttach("noimage.png");
        return entity==null? 0:1;
    }
    public int updatePost_old(PostDTO postDTO) {
        Post entity=postDTO.toEntity();
        Post updatePost = postRepsoitory.save(entity);
        //save(): id를 갖는 entity가 영속성 컨텍스트에 존재하면 update문을 실행. 없는 엔티티면 insert문 실행
         return updatePost==null? 0: 1;
    }
}
