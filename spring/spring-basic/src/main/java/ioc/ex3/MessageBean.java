package ioc.ex3;

//인터페이스 : spec
// - 추상메서드
// - final 상수
public interface MessageBean {
    public abstract void sayHello(String name);//추상메서드
}
//인터페이스를 상속받는 자식 클래스에서는 추상메서드를 반드시 구현해야 한다(오버라이딩-재정의)
