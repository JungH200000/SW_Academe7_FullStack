package com.my.spring_mybatis.post.mapper;

import com.my.spring_mybatis.post.domain.PostDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

//spring mybatis를 이용하면 XXXMapper인터페이스 구현체를 스프링이 알아서
//만들어 준다
//대신 지켜야할 규칙이 있다 PostMapper.xml의 namespace에
//PostMapper인터페이스의 패키지명과 인터페이스명을 맞춰서 기술해야 한다
@Mapper
public interface PostMapper {

    int testMyBatis();

    List<PostDTO> listPost();
}
