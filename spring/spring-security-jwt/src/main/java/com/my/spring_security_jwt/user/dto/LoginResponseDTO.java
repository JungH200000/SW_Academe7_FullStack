package com.my.spring_security_jwt.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
@AllArgsConstructor
public class LoginResponseDTO {

    private String result;
    private String message;
    private Map data; //payload- 로그인한 회원정보(id,name,email,role) + accessToken +refreshToken
//    private String accessToken; ==> Map에 포함시키자
//    private String refreshToken;

}
