package basic.app;

import basic.entity.UserEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;

import java.util.List;

public class UserEntitySelectTest {
    public static void main(String[] args) {
        EntityManagerFactory factory
                = Persistence.createEntityManagerFactory("entitytest");
        EntityManager em=factory.createEntityManager();
        em.getTransaction().begin();
        System.out.println("Tx시작---------------------");
        //조회 [1] em.find(엔티티클래스,PK)
        //     [2] JPQL을 이용한 조회 ==> em.createQuery(JPQL)
        UserEntity findUser = em.find(UserEntity.class, 4L);//id가 4번 조회
        System.out.println(findUser.toString());
        System.out.println("***모든 회원 정보 조회***************");
        TypedQuery<UserEntity> query=em.createQuery("select u  from UserEntity u", UserEntity.class);
        //하이버네이트가 JPQL --> Dialect(방언)을 참조해서  DB벤터별 SQL문법에 맞춰 변환(sql문으로)해서 실행
        List<UserEntity> list = query.getResultList();
        for(UserEntity user:list){
            System.out.println(user.getId()+"/"+user.getName());
        }
        System.out.println("-----------------");
        list.stream().forEach(user -> System.out.println(user));

        em.getTransaction().commit();
        System.out.println("Tx종료---------------------");
        em.close();
        factory.close();
    }
}
