package com.my.spring_mybatis.post.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PageDTO {
    private int totalCount;//총 게시물 수
    private int size=5;//한 페이지 당 보여줄 목록 개수
    private int totalPages;//전체 페이지 수
    private int page=1;//현재 페이지
    
    private int offset=0;//DB에서 데이터 끊어올 때 사용할 오프셋
    
    private int pagingBlock=5;//페이징 블럭
    private int startPage;//시작 페이지 (페이지 블럭 단위) 1, 6, 11, ....
    private int endPage;//끝 페이지

    private boolean prev; //이전 블럭 존재 여부
    private boolean next;//이후 블럭 존재 여부

    private int findType;//검색 유형 (0, 1(title), 2(name), 3(content) )
    private String findKeyword;// 검색어

    //페이징 처리 연산을 수행하는 메서드
    public void init(){
        //JS : totalPages = Math.ceil(totalCount/size)
        //Java: totalPages = (totalCount-1)/size +1
        //Java  totalPages = Math.ceil((double)totalCount/size)
        //totalCount        totalPages
        //1 ~ 5             :   1
        // 6~ 10                2
        //11 ~15                3
        totalPages=(totalCount==0)? 1: (totalCount-1)/size +1;
        offset = (page-1) *size;
        //page          offset
        // 1            0
        //2             5
        //3             10
        if(page <1)  page=1;
        if(page>totalPages) page=totalPages;
        if(findKeyword==null) findKeyword="";

    }
}
