package com.shopkart.service;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopkart.entity.AddressEntity;
import com.shopkart.entity.UserEntity;
import com.shopkart.repository.AddressRepository;

@Service
public class AddressService {
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private AuthenticationService userService;
	
	public List<AddressEntity> getAllUserAddress(){
		UserEntity user = userService.getAuthenticatedUser();
		return addressRepository.findByUserOrderByCreatedOnDesc(user);
	}

	public AddressEntity saveAddress(AddressEntity address) {
		address.setCountry("India");
	    address.setUser(userService.getAuthenticatedUser());
	    address.setCreatedOn(new Timestamp(System.currentTimeMillis()));
	    return addressRepository.save(address);
	}

}
