package com.demo.mywebapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageButton;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class IntroActivity extends AppCompatActivity {

    ImageButton introIcon;
    @Override
    public void onCreate(Bundle bundle){
        super.onCreate(bundle);
        SharedPreferences prefs = getSharedPreferences("MyWebAppPrefs", MODE_PRIVATE);
        boolean isLoggedIn = prefs.getBoolean("isLoggedIn",false);

        setContentView(R.layout.activity_intro);
        introIcon = findViewById(R.id.introIcon);

        //이미지버튼에 투명/확대 애니메이션 적용해보자
        Animation animation = AnimationUtils.loadAnimation(this,R.anim.tween);
        introIcon.startAnimation(animation);

        introIcon.postDelayed(()->{

            if(isLoggedIn){
                Toast.makeText(IntroActivity.this,"Main 액티비티로 넘어가요~", Toast.LENGTH_SHORT).show();
                //이미 로그인인 경우=> MainActivity 로
                startActivity(new Intent(IntroActivity.this, MainActivity.class));
            }else {
                Toast.makeText(IntroActivity.this,"로그인 액티비티로 넘어가요~", Toast.LENGTH_SHORT).show();
                //로그인 안된 경우 => LoginActivity로
                Intent intent = new Intent(IntroActivity.this, LoginActivity.class);
                startActivity(intent);

            }
            finish();
        }, 5000);


        //버튼 클릭시  MainActivity로 넘어가도록
//        introIcon.setOnClickListener(v->{
//            Toast.makeText(IntroActivity.this,"메인 액티비티로 넘어가요~", Toast.LENGTH_SHORT).show();
//            Intent intent =new Intent(IntroActivity.this, MainActivity.class);
//            //Intent : 화면 전환, 데이터 전달
//            startActivity(intent);
//
//        });
    }//onCreate()-------------------------

}
