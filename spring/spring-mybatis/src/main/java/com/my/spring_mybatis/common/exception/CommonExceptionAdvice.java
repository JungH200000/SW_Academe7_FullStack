package com.my.spring_mybatis.common.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.SQLIntegrityConstraintViolationException;

//예외를 처리하는 클래스 - 예외 처리 관련 메서드 모음
@ControllerAdvice  //Restful방식일 때 @RestControllerAdvice를 붙인다
@Slf4j
public class CommonExceptionAdvice {

    @ExceptionHandler(IllegalArgumentException.class)
    public String exceptionHandler(Exception ex, Model model){
        log.error("예외 발생: {}", ex.getMessage());
        //ex.printStackTrace();
        model.addAttribute("msg",ex.getMessage());
        model.addAttribute("loc","/login");
        return "error";
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public String handleException(Exception ex, Model model){
        //ex.printStackTrace();
        log.error("예외 발생: {}",ex.getMessage());
        model.addAttribute("msg",
                "이미 사용중인 이메일 입니다");
        model.addAttribute("loc","javascript:history.back()");
        return "error";
    }

}
