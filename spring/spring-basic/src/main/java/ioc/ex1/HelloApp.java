package ioc.ex1;

/** 문서화 주석 : API문서 만들때 설명으로 들어감
 *
 */
public class HelloApp {
// 단문주석
/* 복문
주석*/
    public static void main(String[] args){
        //HelloApp uses MessageBeanEn ==> 의존관계 (강한 결합력)
//        MessageBeanEn msg =new MessageBeanEn();
        //msg.sayHi("Tom")
        MessageBeanKo msg =new MessageBeanKo();
        msg.sayHello("Tom");

    }

}
