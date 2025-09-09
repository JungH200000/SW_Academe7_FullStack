package com.demo.mywebapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class LoginActivity extends AppCompatActivity {

    EditText editEmail, editPwd;
    Button btnLogin;
    private String userId="dooly@a.b.c";//로그인 더미 데이터
    private String userPw="111";


    @Override
    public void onCreate(Bundle bundle){
        super.onCreate(bundle);
        setContentView(R.layout.activity_login);
        editEmail = findViewById(R.id.editEmail);
        editPwd = findViewById(R.id.editPwd);
        btnLogin=findViewById(R.id.btnLogin);

        btnLogin.setOnClickListener(v->{
            String email = editEmail.getText().toString();
            String passwd = editPwd.getText().toString();
            if(email.equals(userId) && passwd.equals(userPw)) {
                //로그인 정보 저장
                SharedPreferences prefs = getSharedPreferences("MyWebAppPrefs", MODE_PRIVATE);
                //KEY-VALUE쌍으로 저장 / 내부적으로 XML 파일에 저장된다.
                prefs.edit().putBoolean("isLoggedIn", true)
                        .putString("loginUser", email)
                        .apply(); //비동기 방식으로 저장. commit(): 동기 방식으로 저장

                Toast.makeText(LoginActivity.this,
                        "환영합니다. 아이디가 저장됐습니다",Toast.LENGTH_SHORT).show();
                
                Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                startActivity(intent);
                finish();
            }else{
                Toast.makeText(LoginActivity.this,
                        "아이디 또는 비밀번호가 일치하지 않아요",Toast.LENGTH_SHORT).show();
            }
        });

    }
}
