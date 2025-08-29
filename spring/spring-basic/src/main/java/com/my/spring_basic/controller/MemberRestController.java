package com.my.spring_basic.controller;

import com.my.spring_basic.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController //Ajax 전용 컨트롤러  @Controller + @ResponseBody 합친 어노테이션
@Slf4j  //log객체 이용해서 로깅
public class MemberRestController {

    @Autowired
    private MemberService memberService;

    @GetMapping("/api/check-email")
    public Map<String, Boolean> checkEmail(String email){
        log.info("email==={}", email);
        Map<String, Boolean> map = memberService.checkEmailDuplicated(email);

        return map;
    }
    
}
