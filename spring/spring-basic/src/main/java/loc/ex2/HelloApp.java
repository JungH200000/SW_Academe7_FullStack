package loc.ex2;

/** 문서화 주석: API 문서 만들 때 설명으로 들어감
 *
 */
public class HelloApp {
  // 단문 주석
  /* 복문
  주석 */
  public static void main(String[] args) {
    // HelloApp uses MessageBeanEn ==> 의존관계 (강한 결합력)
    // MessageBeanKo msg = new MessageBeanKo();
    MessageBeanEn msg = new MessageBeanEn();
    msg.sayHello("Tom");

  }
}
