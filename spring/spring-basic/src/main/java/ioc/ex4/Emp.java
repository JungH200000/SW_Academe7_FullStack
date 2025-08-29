package ioc.ex4;

public class Emp {
    private String name; //멤버변수,인스턴스 변수
    private String dept;

    private int salary;

    public Emp(){ //default 생성자
        System.out.println("Emp() 기본생성자");
    }
    public Emp(String name, String dept, int sal){//인자 생성자 argument constructor
        System.out.println("Emp() 인자생성자");
        this.name=name;
        this.dept=dept;
        this.salary =sal;
    }

    //setter
    public void setName(String n){
        this.name =n;
    }
    public void setDept(String dept){
        this.dept = dept;
    }
    public void setSalary(int sal){
        this.salary =sal;
    }

    //getter
    public String getName(){
        return this.name;
    }
    public String getDept(){
        return dept;
    }
    public int getSalary(){
        return salary;
    }
}
