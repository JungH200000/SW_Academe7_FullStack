package com.my.spring_security_jwt;

import com.my.spring_security_jwt.filter.JwtFilter;
import com.my.spring_security_jwt.user.repository.MemberRepository;
import com.my.spring_security_jwt.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class WebSecurityAndJwtConfig {

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private MemberRepository memberRepository;

    private static final String[] WHITE_LIST={"/",
            "/index.html","/assets/**",
            "/api/posts/**","/api/users/**",
            "/api/auth/login","/api/auth/logout",
            "/api/auth/refresh","/api/auth/user",
            "public/**","/uploads/**"};

    @Bean
    public JwtFilter jwtFilter(){
        return new JwtFilter(jwtUtil, memberRepository);
    }

    @Bean
    public WebSecurityCustomizer configure(){
        return(web-> web.ignoring().requestMatchers("/static/**"));
    }


    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry){
//                registry.addMapping("/api/**")
                        //.allowedOrigins("http://localhost:5173") //모바일 웹뷰에서 접근 허용 하려면 모든* 것 허용하도록 수정하자
                registry.addMapping("/**")   // 모든 경로 허용
                        .allowedOrigins("http://localhost:7777","http://192.168.0.118:7777") // 모든 origin 허용 (또는 안드로이드 기기 IP)
                        .allowedMethods("GET","POST","DELETE","PUT","OPTIONS") //허용할 HTTP 메서드
                        .allowCredentials(true);
            }
        };
    }

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
                                //.requestMatchers("/api/auth/**").hasAnyRole("USER","ADMIN")
                                .anyRequest().authenticated()
                        )
                //.formLogin(() //=>리액트에서 로그인 폼을 제공. jwt기반일 때는 사용x
                .logout(logout->
                        logout.logoutSuccessUrl("/") //로그아웃 처리후 돌아갈 페이지 url지정
                        .invalidateHttpSession(true))
                //accessDenied 처리 ???
                //** JWT 필터 추가해야 함 (UsernamePasswordAuthenticationFilter  앞에 배치해야 함)
                .addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class);
                //*************************************************************************
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    /*
   # Spring Security가 폼 로그인을 설정하면(http.formLogin() 사용)
    내부적으로 DaoAuthenticationProvider를 자동 생성하고,
    UserDetailsService + PasswordEncoder를 자동으로 연결함.
    그래서 별도로 AuthenticationManager를 직접 만들지 않아도 됨

    # JWT 기반 로그인에서 직접 설정하는 이유
    폼 로그인 사용 안 하고, React에서 직접 로그인 요청 → JWT 발급
    Spring Security가 자동으로 AuthenticationManager를 만들어주지 않음
    따라서 AuthenticationManager를 수동으로 만들어야 함
*/
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder passwordEncoder)
    throws Exception
    {
        DaoAuthenticationProvider authProvider =new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(authProvider);
    }

}
