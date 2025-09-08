package com.my.spring_security_jwt.user.dto;

import com.my.spring_security_jwt.user.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class ListMemberDTO {
    private Long id;
    private String name;
    private String email;
    private String passwd;
    private String role;//enum으로 변경 필요
    private LocalDateTime createdAt;

    public ListMemberDTO(Member entity){
        this.id=entity.getId();
        this.name=entity.getName();
        this.email=entity.getEmail();
        this.role=entity.getRole();
        this.createdAt =entity.getCreatedAt();
    }
}
