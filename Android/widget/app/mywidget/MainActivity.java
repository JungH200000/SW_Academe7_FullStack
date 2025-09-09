package com.demo.mywidget;

import android.os.Bundle;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

    ImageButton imageButton;
    TextView textView;

    EditText editMsg, editName, editPwd;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_widget);
        //레이아웃 설정

        imageButton = findViewById(R.id.imageButton);
        textView = findViewById(R.id.textView);
        editMsg = findViewById(R.id.editMsg);
        editName = findViewById(R.id.editName);
        editPwd = findViewById(R.id.editPwd);

        imageButton.setOnClickListener(v -> {
            String msg=editMsg.getText().toString();
            if(msg==null||msg.trim().isBlank()){
                Toast.makeText(MainActivity.this,"메시지를 입력하세요!!", Toast.LENGTH_SHORT).show();
                editMsg.requestFocus();
                return;
            }
            textView.setText(msg);
            editMsg.setText("");
            editMsg.requestFocus();
        });


    }
}