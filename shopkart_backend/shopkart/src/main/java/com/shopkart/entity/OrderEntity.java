package com.shopkart.entity;


import java.sql.Timestamp;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="orders")
public class OrderEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	UserEntity user;
	
	@ManyToOne
	@JoinColumn(name="address_id")
	AddressEntity address;
	
	@OneToMany(mappedBy = "order",cascade = CascadeType.ALL)
	List<OrderItemEntity> orderItem;
	
	Integer total_amount;
	Integer tax_amount;
	Integer shipping_amount;
	
	String status;
	
	Timestamp order_date;
	
	

}
