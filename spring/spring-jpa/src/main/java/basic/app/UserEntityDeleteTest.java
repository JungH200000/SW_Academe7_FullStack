package basic.app;

import basic.entity.UserEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;

import java.util.Scanner;

public class UserEntityDeleteTest {

    public static void main(String[] args) {
        EntityManagerFactory factory
                = Persistence.createEntityManagerFactory("entitytest");
        EntityManager em=factory.createEntityManager();
        em.getTransaction().begin();
        System.out.println("Tx시작---------------------");
        TypedQuery<UserEntity> query = em.createQuery("select u from UserEntity u",UserEntity.class);
        query.getResultList().stream().forEach(System.out::println);
        Scanner sc=new Scanner(System.in);
        System.out.println("엔터키1 ...");
        sc.nextLine();
        System.out.println(">>>엔티티 삭제 예정<<<");
        UserEntity findUser = em.find(UserEntity.class,3L);
        if(findUser!=null){
            //삭제 em.remove(엔티티)
            em.remove(findUser);
            System.out.println("remove()호출됨...");
        }
        System.out.println("엔터키 2...");
        sc.nextLine();

        query = em.createQuery("select u from UserEntity u",UserEntity.class);
        query.getResultList().stream().forEach(System.out::println);

        System.out.println("엔터키 3...commit예정");
        sc.nextLine();
        em.getTransaction().commit();//실제 DB에 delete문 반영
        System.out.println("Tx끝---------------------");

        query = em.createQuery("select u from UserEntity u",UserEntity.class);
        query.getResultList().stream().forEach(System.out::println);
        em.close();
        factory.close();
    }
}
