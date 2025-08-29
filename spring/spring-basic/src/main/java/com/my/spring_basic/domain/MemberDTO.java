package com.my.spring_basic.domain;

import lombok.*;
import java.sql.Date;

//DTO (Data Transfer Object)
//lombok==> setter, getter,생성자 등등 자동화 해줌
@Setter
@Getter
@NoArgsConstructor  //기본생성자
@AllArgsConstructor //인자생성자
@ToString //toString()메서드 자동으로 구성
public class MemberDTO {
        private int id;
        private String name;
        private String email;

        private String passwd;
        private String role; //USER, ADMIN

        private Date createdAt;
}
