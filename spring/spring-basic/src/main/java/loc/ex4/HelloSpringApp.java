package loc.ex4;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class HelloSpringApp {
  public static void main(String[] args) {
//    Emp e1 = new Emp("청아", "영업", 5000);
//    System.out.printf("Name: %s, Dept: %s, Salary: %d \n", e1.getName(), e1.getDept(), e1.getSalary());

    // Spring 컨테이너로 객체를 룩업
    ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
    // Java로 설정 시 사용하는 Spring 컨테이너
    // e1을 찾아 이름, 부서, 급여 출력
    Emp e1 = ctx.getBean("e1", Emp.class);
    System.out.println("e1의 주소값: " + e1);
    System.out.printf("Name: %s, Dept: %s, Salary: %d \n", e1.getName(), e1.getDept(), e1.getSalary());

    Emp e2 = ctx.getBean("empInfo2", Emp.class);
    System.out.println("e2의 주소값: " + e2);
    System.out.printf(e2.getName() + "/" + e2.getDept() + "/" + e2.getSalary());
  }
}
