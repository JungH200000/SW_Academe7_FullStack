package com.my.spring_security_jwt.user.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name="spring_member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@Setter
@Getter
@ToString
// UserDetails 인터페이스를 상속 받을 예정. 인증된 사용자 정보를 담는 객체(권한 정보도 가짐)
/*Spring Security에서 사용자 인증 및 권한 관리를 하려면, 사용자 정보를 담는 객체가 필요하다.
    Spring Security는 이를 위해 UserDetails 인터페이스를 제공하며, 이 인터페이스를 구현해야 함
    UserDetailsService에서 loadUserByUsername() 메서드를 호출할 때,
    반환되는 객체는 반드시 UserDetails 타입이어야 함.
   우리가 만든 Member 엔티티가 UserDetails를 구현하지 않으면,
   Spring Security는 이를 사용자 정보로 인식하지 못함.
    */
public class Member implements UserDetails { //Entity이면서 UserDetails객체도 된다

    @Id //PK에 붙인다
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="email", nullable = false)
    private String email;

    @Column(name="passwd", nullable = false)
    private String passwd;

    @Column
    private String role; //회원 권한 (USER, ADMIN)

    @CreationTimestamp //생성 날짜 자동 설정
    private LocalDateTime createdAt;

    @UpdateTimestamp //마지막 수정날짜를 자동 설정
    private LocalDateTime updatedAt;

    @Column(name="refresh_token")
    private String refreshToken;


    //사용자 권한(role)을 반환하는 메서드
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // DB에는 USER,ADMIN ==> SECURITY 에서는 "ROLE_" 접두어를 붙여 반환해야 함
        // ROLE_USER, ROLE_ADMIN, ROLE_GUEST ....
        List authorities = List.of(new SimpleGrantedAuthority("ROLE_"+this.role));
        return authorities;
    }

    @Override
    public String getPassword() {
        return  this.passwd;
    }

    @Override
    public String getUsername() { //unique한 필드 반환
        return this.email;
    }


    @Override//계정 만료 여부
    public boolean isAccountNonExpired() {
        return true;//=> 만료되지 않았단 의미.
    }

    //계정 잠금 여부 반환
    @Override
    public boolean isAccountNonLocked() {
        return true;//=> 잠금되지 않음
    }

    //패스워드 만료 여부 반환
    @Override
    public boolean isCredentialsNonExpired() {
        return true;//만료되지 않음
    }
    //계정 사용 가능 여부 반환
    @Override
    public boolean isEnabled() {
        return true;//=> 사용 가능
    }



}
