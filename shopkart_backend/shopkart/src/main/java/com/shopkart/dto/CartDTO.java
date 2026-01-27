package com.shopkart.dto;

import java.util.List;

import lombok.Data;

@Data
public class CartDTO {

	Integer cartId;
	Double totalPrice;
	List<CartItemDTO> items;
}
