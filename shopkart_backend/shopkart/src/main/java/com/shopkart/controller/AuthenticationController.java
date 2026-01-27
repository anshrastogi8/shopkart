package com.shopkart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopkart.dto.LoginResponse;
import com.shopkart.dto.LoginUserDTO;
import com.shopkart.dto.RegisterUserDTO;
import com.shopkart.service.AuthenticationService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
	
	@Autowired
	private AuthenticationService authenticationService;
	
	@PostMapping("/signup")
	public ResponseEntity<?> register(@RequestBody RegisterUserDTO registerUserDto){
		LoginResponse response = authenticationService.signUp(registerUserDto);	
		return new ResponseEntity<LoginResponse>(response,HttpStatus.OK);
	}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUserDTO loginUserDto) {
        LoginResponse loginResponse = authenticationService.logIn(loginUserDto);
        return new  ResponseEntity<LoginResponse>(loginResponse,HttpStatus.OK);
    }

}
