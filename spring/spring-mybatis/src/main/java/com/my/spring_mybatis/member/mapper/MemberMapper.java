package com.my.spring_mybatis.member.mapper;

import com.my.spring_mybatis.member.domain.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberMapper {

    int createMember(MemberDTO user);
    List<MemberDTO> listMember();

    Integer checkEmail(String email);

    MemberDTO findByEmail(String email);
    //로그인 시 사용. 이메일로 회원의 모든 정보 가져오기
    // 반환타입이 null이면 입력한 이메일은 틀린 이메일 ==> IllegalArgumentException 발생
    // null이 아니면 DB에 저장된 비번과 사용자가 입력한 비번이 일치하는지 체크
    // BCryptPasswordEncoder matches(p1, p2)

}
