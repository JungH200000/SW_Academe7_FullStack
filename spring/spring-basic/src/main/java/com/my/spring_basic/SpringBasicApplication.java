package com.my.spring_basic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.my.spring_basic"})
public class SpringBasicApplication {

	public static void main(String[] args) {

		SpringApplication.run(SpringBasicApplication.class, args);
	}

}
