package loc.ex4;

public class Emp {
  private String name; // 멤버 변수 또는 인스턴스 변수
  // private => 외부에서 함부로 접근 못함
  private String dept;
  
  private int salary;
  
  public Emp() { // default 생성자
    System.out.println("Emp() 기본 생성자");
  }
  public Emp(String name, String dept, int sal) {
    System.out.println("Emp() 인자 생성자");
    this.name = name;
    this.dept = dept;
    this.salary = sal;
  }
  // private을 한 경우 setter, getter 사용
  // setter
  public void setName(String n) {
    this.name = n;
  }
  public void setDept(String dept) {
    this.dept = dept;
  }
  public void setSalary(int sal) {
    this.salary = sal;
  }
  // getter
  public String getName() {
    return this.name;
  }
  public String getDept() {
    return this.dept;
  }
  public int getSalary() {
    return this.salary;
  }
}
