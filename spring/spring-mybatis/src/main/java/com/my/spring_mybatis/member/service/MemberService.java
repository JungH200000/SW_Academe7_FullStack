package com.my.spring_mybatis.member.service;

import com.my.spring_mybatis.member.domain.MemberDTO;
import com.my.spring_mybatis.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service(value="memberService") //@Resource(name="memberService") => by Name으로 주입
@RequiredArgsConstructor //생성자 인젝션
@Slf4j
public class MemberService {

    private final MemberMapper memberMapper; //생성자 인젝션
    private final BCryptPasswordEncoder passwordEncoder;

    public int createMember(MemberDTO user){
        //user ==> 회원정보 (비밀번호 raw-날것)
        String encodePasswd=passwordEncoder.encode(user.getPasswd());
        //암호화 처리한 비밀번호
        // System.out.println(encodePasswd);
        user.setPasswd(encodePasswd);//암호화된 비밀번호 설정

        return memberMapper.createMember(user);//DB에 insert
    }
    public List<MemberDTO> listMember(){
        return memberMapper.listMember();
    }

    public Map<String, Boolean> checkEmailDuplicated(String email) {
        //select mid from members where email='admin@naver.com'
        //mid값을 가져오면 이미 사용중==>true반환/ mid값이 없으면 사용 가능한 이메일==>false반환
        Integer mid= memberMapper.checkEmail(email);
        boolean result=(mid==null)? false: true;
        Map<String,Boolean> map=Map.of("exists", result);
        return map;
    }

    //로그인 시 사용. 이메일로 회원의 모든 정보 가져오기
    // 반환타입이 null이면 입력한 이메일은 틀린 이메일 ==> IllegalArgumentException 발생
    // null이 아니면 DB에 저장된 비번과 사용자가 입력한 비번이 일치하는지 체크
    // BCryptPasswordEncoder matches(p1, p2)
    // 비번 불일치시==> IllegalArgumentException 발생
    public MemberDTO loginCheck(MemberDTO tmpUser){
        MemberDTO dbUser=memberMapper.findByEmail(tmpUser.getEmail());
        if(dbUser==null) throw new IllegalArgumentException("이메일 또는 비밀번호가 일치하지 않아요");
        //비밀번호 일치 여부 체크
        // 사용자가 입력한 날것의 비번과 DB에서 가져온 암호화된 비번 일치 여부 체크
        boolean isMatch = passwordEncoder.matches(tmpUser.getPasswd(),dbUser.getPasswd());
        log.info("비번 일치 여부: {}", isMatch);
        if(!isMatch) throw new IllegalArgumentException("이메일 또는 비밀번호가 일치하지 않아요2");
        dbUser.setPasswd("");//비밀번호 초기화
        return dbUser;
    }

}
