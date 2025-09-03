package com.my.spring_jpa.member.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Setter
@Getter
@ToString
public class MemberDTO {
    private int id;
    private String name;
    private String email;
    private String passwd;
    private String role;//USER,ADMIN
    private LocalDate createdAt;//가입일
}
