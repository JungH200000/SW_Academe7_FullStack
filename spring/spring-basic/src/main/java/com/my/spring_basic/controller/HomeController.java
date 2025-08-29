package com.my.spring_basic.controller;

import com.my.spring_basic.domain.MemberDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.List;

//HomeController ctr=new HomeController()
//ctr.showHome() ==> 개발자 주도
//Spring Framework ==> 주도권이 스프링 컨테이너에게 있음 (Inversion of Control -역제어)
//객체생성을 스프링이 알아서
@Controller
public class HomeController {

    @RequestMapping("/") //http://localhost:8080/
    public String showHome(Model model){
        System.out.println("showHome() 메서드 실행됨..."); //sout

        String data ="DB에서 가져온 데이터에요";

        model.addAttribute("data", data);
        model.addAttribute("msg","데이터 가져오기 성공");

        return "home";//뷰 네임
        //접두어+뷰네임+접미어
        //resources/templates/home.html
    }
    @RequestMapping("/test")
    public String showMessage(Model model){
        model.addAttribute("msg","Post글쓰기 성공");
        model.addAttribute("loc","/");
        
        return "message";
    }

    @RequestMapping(value="/demo1",method = RequestMethod.GET)
    public String demo1(Model model){
        MemberDTO m1=new MemberDTO(1,"김회원","kim@a.b.c","111","USER",null);
        MemberDTO m2=new MemberDTO(2,"송회원","kim@a.b.c","111","USER",null);
        MemberDTO m3=new MemberDTO(3,"최회원","kim@a.b.c","111","USER",null);

        List<MemberDTO> arrList =new ArrayList<>();
        arrList.add(m1);
        arrList.add(m2);
        arrList.add(m3);

        model.addAttribute("arrList", arrList);
        return "example/demo1";
    }

    @GetMapping("/demo2")
    public String demo2(Model model){
        String str="<h3 style='color:red'>Hello World~</h3>";
        MemberDTO m1=new MemberDTO(1,"김회원","kim@a.b.c","111","USER",null);
        MemberDTO m2=null;

        model.addAttribute("data", str);
        model.addAttribute("user1", m1);
        model.addAttribute("user2", m2);

        return "example/demo2";
    }

}
