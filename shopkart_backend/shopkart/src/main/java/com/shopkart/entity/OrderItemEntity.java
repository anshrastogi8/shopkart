package com.shopkart.entity;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="order_items")
public class OrderItemEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	@ManyToOne
	@JoinColumn(name="order_id")
	OrderEntity order;
	
	@ManyToOne
	@JoinColumn(name="product_variant_id")
	ProductVariantEntity variant;
	
	Integer quantity;
	String size;
	String color;
	Integer unitPrice;
	Timestamp createdOn;

}
