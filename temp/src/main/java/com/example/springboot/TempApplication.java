package com.example.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication(scanBasePackages={"com.example"})
@EnableJpaRepositories(basePackages = {"com.example"})
@EntityScan(basePackages = {"com.example.model"})
public class TempApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(TempApplication.class, args);
	}

}
