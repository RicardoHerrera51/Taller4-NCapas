package com.grupo13.Taller4;

import java.security.SecureRandom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ServerApplication {
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(8, new SecureRandom());
	}
	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

}
