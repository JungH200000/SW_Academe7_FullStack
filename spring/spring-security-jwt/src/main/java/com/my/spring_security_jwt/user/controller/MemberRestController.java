package com.my.spring_security_jwt.user.controller;

import com.my.spring_security_jwt.user.dto.AddMemberDTO;
import com.my.spring_security_jwt.user.dto.ResponseDTO;
import com.my.spring_security_jwt.user.entity.Member;
import com.my.spring_security_jwt.user.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController //REST방식 지원  @Controller + @ResponseBody
@RequestMapping("/api/users")
@Slf4j
@RequiredArgsConstructor
public class MemberRestController {

    private final MemberService memberService;

    //회원가입 처리
    @PostMapping("")
    public ResponseEntity<ResponseDTO> signup(@RequestBody AddMemberDTO user){
        log.info("user==={}",user);
        Member newUser=memberService.createMember(user);
        String result=(newUser==null)?"fail":"success";
        String msg=(newUser!=null)? "회원가입 처리 완료-로그인으로 이동합니다":"회원가입 실패-이메일 중복여부 체크하세요";
        ResponseDTO res=new ResponseDTO(result, msg);
        return ResponseEntity.ok().body(res);//200 OK
    }

}
