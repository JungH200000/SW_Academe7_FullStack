package com.my.spring_security_jwt.user.repository;

import com.my.spring_security_jwt.user.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {

    Optional<Member> findByEmail(String username);
    //query method   => select * from spring_member where email=?

    @Query("SELECT m.refreshToken  FROM Member m WHERE m.email = :email")
    String findRefreshTokenByEmail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query("UPDATE Member m SET m.refreshToken = :refreshToken WHERE m.email = :email")
    int updateRefreshToken(@Param("email") String email, @Param("refreshToken") String refreshToken);

}
