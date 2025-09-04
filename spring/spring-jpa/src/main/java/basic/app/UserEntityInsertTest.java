package basic.app;

import basic.entity.UserEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

//순수 JPA
//EntityManagerFactory (resources/META-INF/persistence.xml참조)
//일꾼: EntityManager
public class UserEntityInsertTest {

    public static void main(String[] args) {
        EntityManagerFactory factory
                = Persistence.createEntityManagerFactory("entitytest");
        //persistence.xml에 기술된 persistence unit이름을 넣어준다
        System.out.println("EntityManagerFactory: "+factory.getClass().getName());

        EntityManager em =factory.createEntityManager();
        System.out.println("EntityManager: "+em.getClass().getName());

        em.getTransaction().begin();//트랜잭션 시작
        System.out.println("****************************");
        //insert문 실행하려면 em.persist(엔티티객체)
        UserEntity user=null;
        for(int i=0;i<3;i++){
            user =new UserEntity(null,"김민수"+(i+1), "kim"+i+"@a.b.c","111","noimage.png");
            em.persist(user);//C - insert  작업을 함
        }
        em.getTransaction().commit();//Tx 종료
        em.close();
        System.out.println("****Transaction종료*************");
        factory.close();
    }
}
