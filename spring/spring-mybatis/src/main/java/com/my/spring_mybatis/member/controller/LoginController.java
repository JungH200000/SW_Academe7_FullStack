package com.my.spring_mybatis.member.controller;

import com.my.spring_mybatis.member.domain.MemberDTO;
import com.my.spring_mybatis.member.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@Slf4j
public class LoginController {

    @Autowired
    private MemberService memberService;
    
    @GetMapping("/login")
    public String loginForm(@CookieValue(value="saveId", required = false) String saveId,Model model){
        log.info("saveId=={}", saveId);
        model.addAttribute("saveId", saveId);
        return "member/loginForm";
    }

    @PostMapping("/login")
    public String loginProcess(@ModelAttribute MemberDTO tmpUser, Model model,
                               HttpSession session,
                               HttpServletResponse response){
        log.info("tmpUser=={}", tmpUser);
        MemberDTO dbUser=memberService.loginCheck(tmpUser);
        log.info("dbUser=={}", dbUser);
        //회원 인증을 받았다면 dbUser객체 들어옴. 
        //인증받지 못했다면 예외 발생(IllegalArgumentException)
        model.addAttribute("loginUser", dbUser);
        //인증 받은 사용자 정보는 model보다는 session에 저장하자. 브라우저 사용하는 동안 세션에 저장한 정보를 유지함
        session.setAttribute("loginUser", dbUser);
        session.setAttribute("role", dbUser.getRole());
        log.info("jsessionId==={}", session.getId());
        
        //테스트 용
        Cookie ck1=new Cookie("saveId", dbUser.getEmail());
        ck1.setMaxAge(60*60*24*3);//3일간 유효  쿠키 삭제하려면 ck1.setMaxAge(0)으로 설정하면 된다
        ck1.setPath("/");
        response.addCookie(ck1);//응답 보낼때 쿠키를 추가==> 응답 헤더에 쿠키 정보 등록된다
        //저장한 아이디를 loginForm.html에서 아이디(email) 입력 폼에 출력해보자
        
//        return "index";//forward방식으로 이동 (서버 내부에서 이동한다)=> 브라우저에는 이전 요청  url이 남는다
        return "redirect:/";//홈으로 이동 (리다이렉트 방식은 클의 url을 /로 바꾸어서 새로운 요청을 보낸다)
        //==>HomeController가 받음
    }

    @GetMapping("/logout")
    public String logout(HttpSession session){
        //세션에 저장한 모든 변수들을 삭제 처리
        //session.removeAttribute("loginUser");

        //모든 변수를 삭제: invalidate() 메서드 사용 권장
        session.invalidate();
        return "redirect:/";//홈으로 이동
    }
}
