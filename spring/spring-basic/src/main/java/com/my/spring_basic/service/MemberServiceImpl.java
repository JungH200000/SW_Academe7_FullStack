package com.my.spring_basic.service;

import com.my.spring_basic.dao.MemberDAO;
import com.my.spring_basic.domain.MemberDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MemberServiceImpl implements MemberService{

    @Autowired
    private MemberDAO memberDAO;
    
    // 비밀번호 암호화를 위한 객체
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    @Override
    public int createMember(MemberDTO user) {
        //비밀번호 암호화 처리
        String encodePasswd=passwordEncoder.encode(user.getPasswd());
        System.out.println(encodePasswd);
        user.setPasswd(encodePasswd);//암호화된 비밀번호 설정
        
        return memberDAO.createMember(user);
    }

    @Override
    public List<MemberDTO> listMember() {
        return memberDAO.listMember();
    }

    @Override
    public Map<String, Boolean> checkEmailDuplicated(String email) {
        try {
            Integer id = memberDAO.checkEmail(email);
            boolean result = (id == null) ? false : true;
            //해당 이메일이 사용 중일 경우: "exists": true
            //해당 이메일이 없는 경우:"exists":false
            Map<String, Boolean> map = new HashMap<>();
            map.put("exists", result);
            return map;
        }catch (SQLException e){
            e.printStackTrace();
            return Map.of("error", false);
        }
    }
}
