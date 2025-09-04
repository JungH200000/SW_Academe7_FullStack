package com.my.spring_security_jwt;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityAndJwtConfig {

    private static final String[] WHITE_LIST={"/","/api/posts","/signup","public/**"};

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception
    {
        http.cors(cors-> cors.disable()) //cors설정 따로
                .csrf(csrf-> csrf.disable())//rest api에서는 csrf 보호 필요 없음
                .authorizeHttpRequests(auth->
                        auth.requestMatchers(WHITE_LIST).permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/users").hasRole("ADMIN")
                                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                                .requestMatchers("/api/auth/**").hasAnyRole("USER","ADMIN")
                                .anyRequest().authenticated()
                        )
                .logout(logout->
                        logout.logoutUrl("/logout") //로그아웃 요청시 url (디폴트 설정은 post 방식 /logout)
                                .logoutSuccessUrl("/") //로그아웃 처리후 돌아갈 페이지 url지정
                        .invalidateHttpSession(true));
        return http.build();
    }

}
