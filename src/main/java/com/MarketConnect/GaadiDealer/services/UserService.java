package com.MarketConnect.GaadiDealer.services;

import com.MarketConnect.GaadiDealer.classconversions.ClassConversion;
import com.MarketConnect.GaadiDealer.dtos.UserDto;
import com.MarketConnect.GaadiDealer.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClassConversion classConversion;

    public UserDto addUserToDB(UserDto userDto)
    {
       userRepository.save(classConversion.userDtoToUserEntity(userDto));
       return userDto;
    }
}
