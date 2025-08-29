package com.my.spring_basic.dao;

import com.my.spring_basic.domain.MemberDTO;

import java.sql.SQLException;
import java.util.List;

public interface MemberDAO {

    int createMember(MemberDTO user);
    List<MemberDTO> listMember();

    Integer checkEmail(String email) throws SQLException;
}
