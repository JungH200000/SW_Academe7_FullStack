package com.my.spring_mybatis;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {


    //웹에서 접근할 경로와 실제 물리적인 파일 경로를 매핑
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler("/uploads/**") //웹에서 접근할 경로
                .addResourceLocations("file:///D:/devSource/Spring/uploads/");//실제 업로드 디렉토리 경로
    }

}
