package com.my.spring_security_jwt.user.controller;

import com.my.spring_security_jwt.user.dto.LoginRequestDTO;
import com.my.spring_security_jwt.user.dto.LoginResponseDTO;
import com.my.spring_security_jwt.user.entity.Member;
import com.my.spring_security_jwt.user.service.MemberService;
import com.my.spring_security_jwt.util.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@Slf4j
@RequiredArgsConstructor
public class LoginRestController {

    private final MemberService memberService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> loginProcess(@RequestBody LoginRequestDTO req){
        log.info("login요청 들어옴: req==={}",req);
        Optional<Member> opt=memberService.findByEmail(req.getEmail());
        if(opt.isEmpty()|| ! passwordEncoder.matches(req.getPasswd(), opt.get().getPassword())){
            return ResponseEntity.status(401).body("아이디 또는 비밀번호가 일치하지 않아요");
        }
        Member user=opt.get();//인증 사용자
        //accessToken생성
        String accessToken=jwtUtil.generateAccessToken(user);

        //refreshToken생성
        String refreshToken=jwtUtil.generateRefreshToken(user);
        //user에 refreshToken저장
        user.setRefreshToken(refreshToken);
        //서비스 통해 변경 감지하도록 처리
        memberService.updateRefreshToken(user);

        LoginResponseDTO res=new LoginResponseDTO(
                "success",
                "로그인 성공",
                Map.of("name", user.getName(),
                        "email",user.getEmail(),
                        "id",user.getId(),
                        "role",user.getRole(),
                        "accessToken", accessToken,
                        "refreshToken", refreshToken)
               );
        return ResponseEntity.ok(res);
    }//-----------------------------------

    //인증받은 사용자 정보를 보내주는 처리 =>리액트 부모 App에서 받아 전역스토어에 저장함
    @GetMapping("/user")
    public ResponseEntity<?> getAuthUser(@AuthenticationPrincipal Member user) {
        if (user == null) {
            return ResponseEntity.status(401).body("인증되지 않은 사용자");
        }

        // DB 조회
        Member member = memberService.findByEmail(user.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("사용자 없음"));

        return ResponseEntity.ok(Map.of(
                "id", member.getId(),
                "name", member.getName(),
                "email", member.getEmail(),
                "role", member.getRole()
        ));
    }//----------------------------------------------

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> req){
        String refreshToken = req.get("refreshToken");
        log.info("요청한 refreshToken===={}",refreshToken);
        if(refreshToken==null){
            return ResponseEntity.status(401).body("refreshToken이 없습니다");
        }
        try{
            Claims claims=jwtUtil.validateToken(refreshToken);
            //Long id=Long.valueOf(claims.get("id").toString());
            String email=claims.get("email", String.class);
            Optional<Member> opt=memberService.findByEmail(email);
            if(opt.isEmpty() || !refreshToken.equals(opt.get().getRefreshToken())){
                return ResponseEntity.status(403).body("인증되지 않은 회원입니다(리프레시 토큰값 다름)");
            }

            Member user =opt.get();
            String newAccessToken = jwtUtil.generateAccessToken(user);

            return ResponseEntity.ok(Map.of("accessToken", newAccessToken));

        }catch (Exception ex){
            log.error("refreshToken error: "+ex.getMessage());
            return ResponseEntity.status(403).body("인증되지 않은 사용자입니다(refreshToken 유효하지 않음)");
        }

    }//-------------------------------


    @PostMapping("/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal Member userDetails){
        log.info("userDetails===={}",userDetails);
        if(userDetails==null){
            return ResponseEntity.status(401).body("인증되지 않은 사용자 입니다");
        }
        //로그인한 사용자의 이메일로
        String email =userDetails.getEmail();
        //DB에서 refreshToken null값 처리 => update문 수행
        int affectedRows = memberService.updateRefreshToken(email, null);
        if(affectedRows>0){
            return ResponseEntity.ok(new LoginResponseDTO("success","로그아웃 되었습니다",Map.of()));
        }else{
            return ResponseEntity.badRequest().body(new LoginResponseDTO("fail","유효하지 않은 사용자입니다", Map.of()));
        }
    }//------------------------------------



}////////////////////////
