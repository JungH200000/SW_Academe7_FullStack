package com.my.spring_mybatis.post.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
public class PostDTO {
    //posts테이블 컬럼명과  PostDTO의 필드명을 일치시켜주자
    private int id;
    private String title;
    private String content;
    private String name;
    private String attach;
    private String old_attach; //[글 수정시]예전 첨부파일명
    private LocalDateTime wdate;//작성일
}
