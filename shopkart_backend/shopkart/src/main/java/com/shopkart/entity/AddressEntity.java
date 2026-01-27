package com.shopkart.entity;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "address")
@Entity
public class AddressEntity {
	
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY )
	Integer id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	@JsonIgnore
	UserEntity user;
	
	String firstName;
	String lastName;
	String email;
	String phone;
	String flat;
	String area;
	String landmark;
	Integer pincode;
	String city;
	String state;
	String country;
	Timestamp createdOn;
	
}
