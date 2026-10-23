package com.MarketConnect.GaadiDealer.repositories;

import com.MarketConnect.GaadiDealer.entities.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle,Long> {
}
