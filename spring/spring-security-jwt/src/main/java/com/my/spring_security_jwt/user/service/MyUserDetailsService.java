package com.my.spring_security_jwt.user.service;

import com.my.spring_security_jwt.user.entity.Member;
import com.my.spring_security_jwt.user.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

/*스프링 시큐리티의 인증 담당 클래스
* UserDetailsService  를 구현
* => loadUserByUsername() 메서드에서 DB 사용자 정보 가져오는 로직을 구성
* => 인증받은 사용자 객체를 User 또는 UserDetails에 담아 반환
* */
@Service
@Slf4j
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Member> opt = memberRepository.findByEmail(username);
        log.info("opt===={}",opt);
        Member authUser = opt.orElseThrow(
                ()->new UsernameNotFoundException("인증에 실패했습니다. 아이디와 비밀번호를 확인하세요"));
        log.info("authUser==={}",authUser);
        return authUser;
    }
}
