package ioc.ex4;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class HelloSpringApp {
    public static void main(String[] args) {
//        Emp e1=new Emp("김사원","영업부",5000);
//        System.out.printf("Name: %s, Dept: %s, Salary: %d\n",e1.getName(), e1.getDept(),e1.getSalary());

        //스프링 컨테이너로 객체를 룩업
        ApplicationContext ctx =new AnnotationConfigApplicationContext(AppConfig.class);
        //java로 설정시 사용하는 스프링 컨테이너
        //e1찾아서 이름 부서 급여 출력하세요
        Emp e1=ctx.getBean("e1", Emp.class);
        System.out.println("e1의 주소값: "+e1);
        System.out.printf("Name: %s, Dept: %s, Salary: %d\n",e1.getName(), e1.getDept(),e1.getSalary());
        
        //empInfo2빈 룩업해서 출력
        Emp e2 =ctx.getBean("empInfo2", Emp.class);
        System.out.println(e2.getName()+"/"+e2.getDept()+"/"+e2.getSalary());
        System.out.println("e2의 주소값: "+e2);

    }
}
