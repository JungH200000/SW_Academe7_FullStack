package com.my.spring_security_jwt.user.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Slf4j
public class MemberViewController {

    @GetMapping("/signup")
    public String signup(){
        return "member/signup";
    }
}
