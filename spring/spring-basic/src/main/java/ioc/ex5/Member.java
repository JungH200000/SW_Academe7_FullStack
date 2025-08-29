package ioc.ex5;

import org.springframework.beans.factory.annotation.Value;

//도메인 객체
// XXXDTO (Data Transfer Object)
// XXXVO (Value Object)
//JPA XXXEntity
public class Member {
    @Value("100") //값(literal)을 주입한다
    private int id;

    @Value("이선아")
    private String name;

    public String showInfo(){
        return "Id: "+id+", Name: "+name;
    }
}
