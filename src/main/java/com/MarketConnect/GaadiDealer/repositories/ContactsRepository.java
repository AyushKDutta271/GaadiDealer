package com.MarketConnect.GaadiDealer.repositories;

import com.MarketConnect.GaadiDealer.entities.Contacts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactsRepository extends JpaRepository<Contacts,Long> {
}
