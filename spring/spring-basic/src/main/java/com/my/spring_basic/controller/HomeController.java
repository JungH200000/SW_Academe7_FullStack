package com.my.spring_basic.controller;
// src/main/java/com.my.spring_basic/controller/HomeController.java
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


/* 개발자 주도
* HomeController ctr = new HomeController()
* ctr.showHome()
*
* */
/* Spring container 주도 (Inversion of control - 역제어)
* Spring Framework가 제어
* 객체 생성을 Spring이 알아서
* @Controller 등
* */

@Controller
public class HomeController {

  @RequestMapping("/") // http:localhost:8080/ request가 오면 아래 코드 실행
  public String showHome(Model model) {
    System.out.println("☑️ showHome() 메서드 실행됨");

    String data = "DB에서 가져온 데이터에요.";
    model.addAttribute("data", data);
    model.addAttribute("msg", "데이터 가져오기 성공");

    return "home"; // view name => home이라는 view page를 찾음
    // view name을 반환하면 접두어와 접미어를 자동으로 붙힘
    // resources/templates/home.html - 확장자는 html이지만 타임리프 파일이다.
  }

}
