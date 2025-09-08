package com.my.spring_security_jwt.filter;

import com.my.spring_security_jwt.user.entity.Member;
import com.my.spring_security_jwt.user.repository.MemberRepository;
import com.my.spring_security_jwt.util.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {
    //OncePerRequestFilter: Spring Security에서 요청 당 한 번만 실행되는 필처. jwt필터로 많이 사용됨
    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;


    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) 
            throws ServletException, IOException {
       log.info("JwtFilter 들어옴 ***********");
        //1. 헤더에서 Authorization 값 가져오기
        String auth=request.getHeader("Authorization"); //Bearer 억세스토큰
        String token=null;
        if(auth !=null && auth.startsWith("Bearer ")){
            token =  auth.substring(7);
        }
        if(token==null|| token.trim().isBlank()){ //처음 로그인 /api/auth/login 시에는 토큰 이 없음
            filterChain.doFilter(request,response);
            return;
        }
        token = token.trim();
        try {
            //2. token값이 유효한지 타당한지 검증
            Claims claims = jwtUtil.validateToken(token);
            //payload꺼내서 UserDetails객체(Member)에 담자 
            String email = claims.get("email", String.class);
            String name  = claims.get("name", String.class);
            Long id = claims.get("id", Long.class);
            String role=claims.get("role", String.class);

            //3. DB에서 refreshToken확인
            String refreshToken = memberRepository.findRefreshTokenByEmail(email);
            log.info("refreshToken===={}",refreshToken);

            if(refreshToken==null){
                response.setStatus(401);
                response.getWriter().write("로그아웃된 사용자 입니다");
                return;
            }
            //3. 제대로 인증된 사용자 => SecurityContext에 인증 정보 저장
            Member  authUser=new Member(id,name,email,"",role,null,null,null);
            //User 를 이용해도 된다.

            var authToken = new UsernamePasswordAuthenticationToken(authUser,null,authUser.getAuthorities());
            SecurityContext ctx=SecurityContextHolder.getContext();
            ctx.setAuthentication(authToken);//세션에 인증객체 저장
            log.info("인증된 객체*****{}"+ctx.getAuthentication().getPrincipal());//Member객체

        }catch(Exception e){
            log.error("토큰 검증 중 에러..."+e.getMessage());
//            e.printStackTrace();
            SecurityContextHolder.clearContext();
        }
        filterChain.doFilter(request, response);
    }
}
