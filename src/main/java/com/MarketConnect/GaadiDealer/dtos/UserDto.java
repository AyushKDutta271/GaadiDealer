package com.MarketConnect.GaadiDealer.dtos;


import com.MarketConnect.GaadiDealer.entities.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {

    private String fullName;
    private String emailId;
    private String password;
    private String confirmPassword;



    private String userState;
    private String userCity;
    private UserType userType;



}
