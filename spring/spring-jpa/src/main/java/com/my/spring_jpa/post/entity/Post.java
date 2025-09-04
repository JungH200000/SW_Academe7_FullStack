package com.my.spring_jpa.post.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@NamedQueries(
        @NamedQuery(
                name="Post.getByName",
                query="select p from Post p where p.name= :name"
        )
)

@Table(name="spring_posts")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //외부에서 함부로 객체 생성 못하도록  protected
@Builder  //Builder 패턴으로 객체 생성  DTO->Entity 변환, Entity=>DTO변환 시 사용
@AllArgsConstructor
@Setter
@Getter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false, length = 200)
    private String title;
    
    @Column(nullable = false)
    private String name;//작성자

    @Column(nullable = true,length = 2000)
    private String content;

    @Column(nullable = true)
    private String attach;

    @CreationTimestamp
    @Column(name="wdate")
    private LocalDateTime wdate;
    
}
