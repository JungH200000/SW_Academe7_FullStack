package ioc.ex5;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public class ServiceImpl implements Service {
    //ServiceImpl은 DAO와 Member에 의존성을 갖는다
    //==> 의존하는 객체를 스프링 주입해준다 (DI)
    @Autowired  // byType으로 주입. DAO타입의 객체가 있으면 주입. 
                // mysql,oracle 2개이상 일 경우 @Qualifier("빈네임")를 붙여 식별하도록 해야 함
    @Qualifier("oracle")
    private DAO dao;

    @Autowired //byType으로 주입한다. Member타입의 객체가 있으면 주입한다
    private Member member;

    public void info1(){
        dao.createMember();
    }
    public void info2(){
        String str=member.showInfo();
        System.out.println(str);
    }
}
