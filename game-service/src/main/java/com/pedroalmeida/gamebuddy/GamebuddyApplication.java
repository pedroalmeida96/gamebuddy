package com.pedroalmeida.gamebuddy;

import com.pedroalmeida.gamebuddy.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(JwtProperties.class)
public class GamebuddyApplication {

	public static void main(String[] args) {
		SpringApplication.run(GamebuddyApplication.class, args);
	}

}
