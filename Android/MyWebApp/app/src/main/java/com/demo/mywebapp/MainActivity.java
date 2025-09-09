package com.demo.mywebapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {
    Button btnNaver, btnPost, btnHtml, btnFile, btnLogout;
    WebView webView;
    TextView textView;
    SharedPreferences prefs;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        prefs = getSharedPreferences("MyWebAppPrefs", MODE_PRIVATE);
        boolean isLoggedIn = prefs.getBoolean("isLoggedIn", false);
        if(!isLoggedIn){
            //로그인으로 돌려보내기
            startActivity(new Intent(this, LoginActivity.class));
            finish();
            return;
        }

        setContentView(R.layout.activity_main);

        //저장된 아이디 가져오기
        String loginUser = prefs.getString("loginUser","Anonymous");

        btnNaver = findViewById(R.id.btnNaver);
        btnPost = findViewById(R.id.btnPost);
        btnHtml = findViewById(R.id.btnHtml);
        btnFile= findViewById(R.id.btnFile);
        btnLogout= findViewById(R.id.btnLogout);
        textView = findViewById(R.id.textView);

        if(!loginUser.equals("") && !loginUser.equals("Anonymous")){
            textView.setText(loginUser+"님 로그인 중...");
        }

        //브라우저 역할
        webView = findViewById(R.id.webView);
        webView.setWebViewClient(new WebViewClient());//링크 클릭시 다른 브라우저로 도망가는 것 막는 설정
        //웹뷰 설정
        WebSettings settings=webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccess(true);
        //처음 로딩시 다음 사이트 보여주도록 => AndroidManifest.xml에 internet사용 권한 설정
        webView.loadUrl("https://m.daum.net");

        btnNaver.setOnClickListener(v->{
            webView.loadUrl("https://m.naver.com");
        });
        btnPost.setOnClickListener(v->{
            webView.loadUrl("http://192.168.0.118:7777");
            //localhost로 하면 안된다. 백엔드 서버의 "ip주소:port번호"

        });
        btnHtml.setOnClickListener(v->{
            String str="<html><body>";
            str +="<h1>Hello WebView</h1>";
            str +="<p>This is HTML String Data</p>";
            str +="<p>안녕 안드로이드 웹뷰</p>";
            str +="</body></html>";
            webView.loadData(str,"text/html","UTF-8");
        });
        btnFile.setOnClickListener(v->{
            webView.loadUrl("file:///android_asset/index.html");
        });
        
        btnLogout.setOnClickListener(v->{
            //로그아웃시 로그인 정보 삭제
            prefs.edit().clear().apply();
            startActivity(new Intent(MainActivity.this, LoginActivity.class));
            finish();
        });

    }//onCreate()-----------------------
}//class end//////////////////////////////////