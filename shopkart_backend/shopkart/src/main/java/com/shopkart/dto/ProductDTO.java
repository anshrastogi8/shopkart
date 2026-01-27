package com.shopkart.dto;

import java.util.List;
import lombok.Data;

@Data
public class ProductDTO{
	
	private Integer id;
    private String title;
    private String description;
    private Integer price;
    private Integer previousPrice;
    private Integer rating;
    private Integer reviews;
    private String itemSold;
    private String sku;
    private String material;
    private String care;
    private String tag;
    private List<ProductVariantDTO> variants;
    private List<String> images; 

}
