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
@Table(name="cart_items")
public class CartItemEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	@ManyToOne
    @JoinColumn(name="cart_id")
	CartEntity cart;
	
	@ManyToOne
    @JoinColumn(name="product_variant_id")
	ProductVariantEntity variant;
	
	Integer quantity;
	Integer unitPrice;
	
	Timestamp createdOn;

}
