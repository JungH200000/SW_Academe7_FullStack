package ioc.ex4;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration //현재 AppConfig클래스를 스프링 빈 설정파일로 사용하겠다는 의미
public class AppConfig {
    @Bean(name="e1")
    @Scope(value="prototype") //=> 매번 새로운 객체를 생성 
    //@Scope 기본값은 singletone => 단일 객체를 사용
    public Emp empInfo(){
        return new Emp("Scott","Analyst",3000);
    }

    @Bean //name을 지정하지 않으면 메서드명이 빈의 이름이 된다. empInfo2
    public Emp empInfo2(){
        Emp e=this.empInfo();
        e.setName("King");
        e.setDept("Research");
        e.setSalary(5000);
        return e;
    }
}
