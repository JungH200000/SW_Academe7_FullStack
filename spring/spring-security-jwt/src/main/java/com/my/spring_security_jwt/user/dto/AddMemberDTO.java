package com.my.spring_security_jwt.user.dto;

import com.my.spring_security_jwt.user.entity.Member;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AddMemberDTO {
    
    private String name;
    private String email;
    private String passwd;
    private String role;//enum으로 변경 필요
    
    public AddMemberDTO(Member entity){//엔티티를 DTO 로 변환
        this.name=entity.getName();
        this.email=entity.getEmail();
        this.passwd=entity.getPasswd();
        this.role=entity.getRole();
    }
}
