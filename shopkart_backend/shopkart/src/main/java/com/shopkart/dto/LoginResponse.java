package com.shopkart.dto;

import lombok.Data;

@Data
public class LoginResponse {
	
	private String token;
	private long expiresIn;
	private UserDTO user;
}
