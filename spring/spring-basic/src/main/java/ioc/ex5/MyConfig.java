package ioc.ex5;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyConfig {
//    빈 등록 MySQLDAO, OracleDAO
    @Bean
    public MySQLDAO mysql(){
        return new MySQLDAO();
    }
    @Bean
    public OracleDAO oracle(){
        return new OracleDAO();
    }
    //ServiceImpl
    @Bean
    public ServiceImpl service(){
        return new ServiceImpl();
    }
    //Member
    @Bean
    public Member user(){
        return new Member();
    }
}
