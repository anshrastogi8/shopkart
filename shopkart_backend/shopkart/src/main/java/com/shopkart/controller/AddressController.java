package com.shopkart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopkart.entity.AddressEntity;
import com.shopkart.service.AddressService;

@RestController
@RequestMapping("/address")
public class AddressController {
	
	@Autowired
	private AddressService addressService;

	@GetMapping("/user")
	public ResponseEntity<?> getUserAddress(){
		return new ResponseEntity<List<AddressEntity>>(addressService.getAllUserAddress(),HttpStatus.OK);
	}
	
	@PostMapping("/save")
	public ResponseEntity<?> saveUserAddress(@RequestBody AddressEntity address){
		return new ResponseEntity<AddressEntity>(addressService.saveAddress(address),HttpStatus.OK);
	}
	
}
