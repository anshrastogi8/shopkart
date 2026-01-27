package com.shopkart.service;

import java.sql.Timestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shopkart.dto.LoginResponse;
import com.shopkart.dto.LoginUserDTO;
import com.shopkart.dto.RegisterUserDTO;
import com.shopkart.dto.UserDTO;
import com.shopkart.entity.CartEntity;
import com.shopkart.entity.UserEntity;
import com.shopkart.exception.UserAlreadyExistsException;
import com.shopkart.repository.CartRepository;
import com.shopkart.repository.UserRepository;
import com.shopkart.utils.JwtService;

@Service
public class AuthenticationService {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private CartRepository cartRepository;

	public LoginResponse signUp(RegisterUserDTO userDetails) {

		if (userRepository.findByEmail(userDetails.getEmail()).isPresent()) {
			throw new UserAlreadyExistsException("User already registered with this email");
		}

		UserEntity user = new UserEntity();
		user.setFullName(userDetails.getFullName());
		user.setEmail(userDetails.getEmail());
		user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
		user.setCreatedOn(new Timestamp(System.currentTimeMillis()));

		UserEntity savedUser = userRepository.save(user);
		CartEntity cart = new CartEntity();
		cart.setUser(savedUser);
		cart.setCreatedOn(new Timestamp(System.currentTimeMillis()));
		cartRepository.save(cart);
		
		String jwtToken = jwtService.generateToken(savedUser);

		LoginResponse loginResponse = new LoginResponse();
		loginResponse.setToken(jwtToken);
		loginResponse.setExpiresIn(jwtService.getExpirationTime());

		UserDTO userDto = new UserDTO();
		userDto.setId(savedUser.getId());
		userDto.setFullName(savedUser.getFullName());
		userDto.setEmail(savedUser.getEmail());

		loginResponse.setUser(userDto);

		return loginResponse;
	}

	public LoginResponse logIn(LoginUserDTO input) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));

		UserEntity authenticatedUser = userRepository.findByEmail(input.getEmail()).orElseThrow();

		String jwtToken = jwtService.generateToken(authenticatedUser);
		LoginResponse loginResponse = new LoginResponse();

		loginResponse.setToken(jwtToken);
		loginResponse.setExpiresIn(jwtService.getExpirationTime());

		UserDTO user = new UserDTO();
		user.setEmail(authenticatedUser.getEmail());
		user.setFullName(authenticatedUser.getFullName());
		user.setId(authenticatedUser.getId());

		loginResponse.setUser(user);
		return loginResponse;

	}
	
	public UserEntity getAuthenticatedUser() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		if(principal instanceof UserDetails) {
			String userName = ((UserDetails) principal).getUsername();
			return userRepository.findByEmail(userName)
	                .orElseThrow(() -> new RuntimeException("User not found."));
		}
		throw new IllegalStateException("Authenticated user not available.");
	}


}
