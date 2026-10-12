package com.MarketConnect.GaadiDealer.services;

import com.MarketConnect.GaadiDealer.classconversions.ClassConversion;
import com.MarketConnect.GaadiDealer.dtos.ContactsDto;
import com.MarketConnect.GaadiDealer.repositories.ContactsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ContactsService {

    @Autowired
    private ContactsRepository contactsRepository;

    @Autowired
    private ClassConversion classConversion;
    public Page<ContactsDto> getAllLeadsFromDB(Pageable pageable)
    {
        return contactsRepository.findAll(pageable).map(c->classConversion.contactsEntityToDto(c));
    }
}
