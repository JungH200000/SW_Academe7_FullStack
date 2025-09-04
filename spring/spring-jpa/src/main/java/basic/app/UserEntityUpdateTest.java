package basic.app;

import basic.entity.UserEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.util.Scanner;

public class UserEntityUpdateTest {
    public static void main(String[] args) {
        EntityManagerFactory factory
                = Persistence.createEntityManagerFactory("entitytest");
        EntityManager em=factory.createEntityManager();

        Scanner sc=new Scanner(System.in);

        System.out.println("수정할 회원번호(id) 입력: ");
        Long id=sc.nextLong();
        UserEntity findUser=em.find(UserEntity.class,id);
        System.out.println("*************");
        if(findUser!=null) System.out.println(findUser);
        System.out.println("*************");
        em.getTransaction().begin();
        System.out.println("Tx시작---------------------");
        if(findUser!=null){
            System.out.println("수정할 회원의 email 입력: ");
            sc.nextLine();//엔터값 입력받고
            String newEmail=sc.nextLine();
            findUser.setEmail(newEmail);//엔티티 변경 ==> 변경 감지
        }//if-----------
        System.out.println("엔터키 1 입력 -commit 예정");
        sc.nextLine();

        System.out.println("Tx종료---------------------");
        em.getTransaction().commit();//DB에 update문 반영
        em.close();
        factory.close();

    }
}
