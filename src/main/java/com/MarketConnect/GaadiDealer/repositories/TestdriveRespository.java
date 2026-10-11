package com.MarketConnect.GaadiDealer.repositories;

import com.MarketConnect.GaadiDealer.entities.TestDrive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestdriveRespository extends JpaRepository<TestDrive,Long> {
}
