package com.MarketConnect.GaadiDealer.controllers;


import com.MarketConnect.GaadiDealer.dtos.LoginUserDto;
import com.MarketConnect.GaadiDealer.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public String loginUser(@RequestBody LoginUserDto user)
    {
        return authService.verify(user);
    }
}
