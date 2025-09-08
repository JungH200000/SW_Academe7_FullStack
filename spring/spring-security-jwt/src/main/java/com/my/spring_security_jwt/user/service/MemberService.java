package com.my.spring_security_jwt.user.service;

import com.my.spring_security_jwt.user.dto.AddMemberDTO;
import com.my.spring_security_jwt.user.dto.ListMemberDTO;
import com.my.spring_security_jwt.user.entity.Member;
import com.my.spring_security_jwt.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public Member createMember(AddMemberDTO user){
        //DTO 를 Entity로 변환
        Member entity=Member.builder()
                .name(user.getName())
                .email(user.getEmail())
                .passwd(passwordEncoder.encode(user.getPasswd()))
                .role(user.getRole())
                .build();
        Member newUser = memberRepository.save(entity);
        log.info("newUser===={}",newUser);
        return newUser;
    }
    public List<ListMemberDTO> findAll(){
        List<Member> list=memberRepository.findAll(Sort.by("id").descending());
       return list.stream().map(entity->new ListMemberDTO(entity)).collect(Collectors.toList());
    }


    public Optional<Member> findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    public void updateRefreshToken(Member user) {
        memberRepository.save(user);
    }
    public int updateRefreshToken(String email, String refreshToken){
        return memberRepository.updateRefreshToken(email, refreshToken);
    }

//    @Transactional
//    public int updateRefreshToken(String email, String refreshToken){
//        Member entity = memberRepository.findByEmail(email)
//                .orElseThrow(()-> new UsernameNotFoundException("인증받지 않은 사용자 입니다"));
//        entity.setRefreshToken(refreshToken);// dirty checking
//        memberRepository.save(entity);
//        return (entity!=null)? 1: 0;
//    }
}
