package com.MarketConnect.GaadiDealer.services;

import com.MarketConnect.GaadiDealer.entities.User;
import com.MarketConnect.GaadiDealer.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String emailId) throws UsernameNotFoundException {
       User user= userRepository.findByEmailId(emailId);
       if(user!=null)
       {
           return user;
       }
       else
       {
           throw new UsernameNotFoundException("No user with emailId could be loaded from Database!");
       }
    }
}
