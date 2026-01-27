package com.shopkart.dto;

import lombok.Data;

@Data
public class CartItemDTO {

	private Integer cartId;
    private Integer cartItemId;
    private Integer quantity;
    private Double unitPrice;
    private Integer variantId;
    private String variantSize;
    private String variantColor;
    private Double variantPrice;
    private Integer productId;
    private String productTitle;
    private String productImage;
	
}
