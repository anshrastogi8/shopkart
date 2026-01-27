package com.shopkart.dto;

import lombok.Data;

@Data
public class RegisterUserDTO {
	
	private String email;
	private String password;
	private String fullName;

}
