package com.my.spring_basic.controller;

import com.my.spring_basic.domain.MemberDTO;
import com.my.spring_basic.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
public class MemberController {

    @Autowired
    private MemberService memberService;

    @RequestMapping(value="/users/form", method = RequestMethod.GET)
    public String joinForm(){
        return "member/signup";
    }

    @RequestMapping(value="/users", method = RequestMethod.POST)
    public String joinProcess(@ModelAttribute MemberDTO user, Model model){
        System.out.println("user: "+user);
        //html 의 input name과 DTO객체의 멤버변수명을 일치시켜주면 스프링이 알아서 DTO 객체에 담아줌
        int result = memberService.createMember(user);
        String msg=(result>0)? "회원가입 성공":"회원가입 실패";
        String loc=(result>0)? "/":"/users/form";

        model.addAttribute("msg",msg);
        model.addAttribute("loc",loc);
        return "message";
    }

    @GetMapping("/users")
    public String allMembers(Model model){
        List<MemberDTO> userList= memberService.listMember();
        model.addAttribute("userList", userList);
        return "member/list";
    }


}
