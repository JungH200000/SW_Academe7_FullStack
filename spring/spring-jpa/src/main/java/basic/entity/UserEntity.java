package basic.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="jpa_user") //DB table명
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserEntity {
    @Id //PK에 붙인다
    @GeneratedValue(strategy = GenerationType.IDENTITY) //자동 증가 설정
    private Long id;
    
    @Column(name="name", nullable = false)
    private String name;
    
    @Column(name="email",nullable = false, unique = true)//not null unique제약조건
    private String email;
    @Column(name = "passwd",nullable = false)
    private String passwd;
    
    @Column(name="profile_image") //snake표기법
    private String profileImage;//camel표기법
}
