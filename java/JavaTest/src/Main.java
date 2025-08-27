public class Main {
  public static void main(String[] args) {
    System.out.println("Hello world!");
    System.out.println("안녕 자바");

    // 참조형: String, Object, Date, ...
    // - 클래스, 인스턴스, 배열
    String str = "반가워요~";
    String str2 = new String("Hello");

    // 기본 자료형
    char c = '가';
    // 정수형 : byte < short < int (default) < long
    // 실수형 : float (4byte) < double (8byte, default)
    int x =10;
    double y = 3.14;
    float z = 1.234f;
    System.out.println("str: " + str);
    System.out.println("str2: " + str2);
  }
}