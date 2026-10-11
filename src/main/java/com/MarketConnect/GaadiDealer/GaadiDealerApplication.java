package com.MarketConnect.GaadiDealer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GaadiDealerApplication {

	public static void main(String[] args) {
		SpringApplication.run(GaadiDealerApplication.class, args);
	}

}
