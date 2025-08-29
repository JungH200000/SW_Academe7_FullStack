package com.my.spring_basic.service;

import com.my.spring_basic.domain.MemberDTO;

import java.util.List;
import java.util.Map;

public interface MemberService {

    public int createMember(MemberDTO user);

    public List<MemberDTO> listMember();

    Map<String, Boolean> checkEmailDuplicated(String email);
}
