package ioc;

import com.my.spring_basic.domain.MemberDTO;

public class Test {
    public static void main(String[] args) {
        MemberDTO user =new MemberDTO(1,"홍길동","hong@a.b.c","111","USER",null);
        System.out.println(user.toString());
        System.out.println(user.getName());
        user.setEmail("gildong@a.b.c");
        System.out.println(user.toString());
    }
}
