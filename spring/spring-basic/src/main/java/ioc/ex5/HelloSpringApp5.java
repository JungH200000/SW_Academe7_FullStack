package ioc.ex5;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class HelloSpringApp5 {
    public static void main(String[] args) {
        ApplicationContext ctx =new AnnotationConfigApplicationContext(MyConfig.class);
        //ServiceImpl객체 룩업해서 info2()호출하세요
        Service svc = ctx.getBean("service", Service.class);
        svc.info2();
        svc.info1();
    }
}
