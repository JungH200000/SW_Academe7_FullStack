package ioc.ex5;

public class OracleDAO implements DAO{

    public void createMember(){
        System.out.println("Oracle DB와 연동하여 회원가입 처리를 합니다");
    }
}
