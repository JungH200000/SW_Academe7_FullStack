package ioc.ex3;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class HelloSpringApp {
    public static void main(String[] args) {
        //MessageBean mb=new MessageBeanEn();//[x]
        //IOC ==> 스프링 컨테이너 통해 필요한 객체를 룩업(Dependency Lookup)해서 사용
        String file="src/main/java/ioc/ex3/applicationContext.xml";
        
        //스프링 컨테이너 생성
        ApplicationContext ctx = new FileSystemXmlApplicationContext(file);//스프링 컨테이너

        //DL
        MessageBean mb = (MessageBean) ctx.getBean("mbEn");

        mb.sayHello("길동");
    }
}
