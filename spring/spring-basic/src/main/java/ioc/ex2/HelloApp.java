package ioc.ex2;

/** 문서화 주석 : API문서 만들때 설명으로 들어감
 *
 */
public class HelloApp {
// 단문주석
/* 복문
주석*/
    public static void main(String[] args){
       //객체간의 결합력을 느슨하게 하는 방법 1: 인터페이스를 이용하는 방법
        MessageBean mb = new MessageBeanKo(); //new MessageBeanEn();
        //부모타입 변수= new 자식객체생성()
        mb.sayHello("철수");

    }

}
