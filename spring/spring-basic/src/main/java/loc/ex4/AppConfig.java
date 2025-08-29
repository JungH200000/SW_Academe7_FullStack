package loc.ex4;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration // 현재 AppConfig 클래스를 Spring 빈 설정파일로 사용하겠다는 의미
public class AppConfig {
  @Bean(name="e1")
  @Scope(value="prototype") // 기본값은 singletone => 단일 객체 사용
  public Emp empInfo() {
    return new Emp("Scott", "Analyst", 3000);
  }

  @Bean
  public Emp empInfo2() {
    Emp e = this.empInfo();
    e.setName("King");
    e.setDept("Research");
    e.setSalary(5000);
    return e;
  }
}
