package basic.app;

import basic.entity.UserEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.util.Scanner;

public class UserEntityInsertTest2 {
    public static void main(String[] args) {
        EntityManagerFactory factory
                = Persistence.createEntityManagerFactory("entitytest");
        //persistence.xml에 기술된 persistence unit이름을 넣어준다

        EntityManager em =factory.createEntityManager();
        em.getTransaction().begin();
        System.out.println("***Tx시작****************");
        UserEntity user=null;
        for(int i=7;i<10;i++){
            user=new UserEntity(null,"김철수"+i,"hong"+i+"@a.b.c","2222","hong.jpg");
            em.persist(user);
            System.out.println("persist()호출함...");
        }
        System.out.println("엔터키를 입력하세요 ...");
        Scanner sc=new Scanner(System.in);
        sc.nextLine();//엔터 입력받음
        sc.close();

        em.getTransaction().commit();
        System.out.println("***Tx종료******************");
        em.close();
        factory.close();
    }
}
