package com.my.spring_security_jwt.post.domain;

import com.my.spring_security_jwt.post.entity.Post;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDTO {
    //posts테이블 컬럼명과  PostDTO의 필드명을 일치시켜주자
    private Integer id;
    private String title;
    private String content;
    private String name;
    private String attach;
    private String old_attach; //[글 수정시]예전 첨부파일명
    private LocalDateTime wdate;//작성일

    // Entity -> DTO 로 변환하는 함수
    public static PostDTO fromEntity(Post post){
        if(post==null) return null;
        return PostDTO.builder()
                .id(post.getId())
                .name(post.getName())
                .title(post.getTitle())
                .content(post.getContent())
                .wdate(post.getWdate())
                .attach(post.getAttach())
                .build();
    }
    //DTO -> Entity로 변환
    public Post toEntity(){
        return Post.builder()
                .id(this.id)
                .name(this.name)
                .title(this.title)
                .content(this.content)
                .attach(this.attach)
                .wdate(this.wdate)
                .build();
    }


}
