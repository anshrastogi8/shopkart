package com.shopkart.mapper;


import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.shopkart.dto.ProductDTO;
import com.shopkart.dto.ProductVariantDTO;
import com.shopkart.entity.ProductEntity;

@Component
public class ProductEntityToDTO {

	public ProductDTO mapToDto(ProductEntity product) {

		ProductDTO dto = new ProductDTO();
		dto.setId(product.getId());
		dto.setTag(product.getTag());
		dto.setTitle(product.getTitle());
		dto.setDescription(product.getDescription());
		dto.setPrice(product.getPrice());
		dto.setPreviousPrice(product.getPreviousPrice());
		dto.setRating(product.getRating());
		dto.setReviews(product.getReviews());
		dto.setItemSold(product.getItemSold());
		dto.setSku(product.getSku());
		dto.setMaterial(product.getMaterial());
		dto.setCare(product.getCare());
		
		if(product.getProductImages() != null) {
            dto.setImages(product.getProductImages().stream()
                    .sorted((a,b) -> a.getImageOrder().compareTo(b.getImageOrder()))
                    .map(pi -> pi.getImages())
                    .collect(Collectors.toList())
            );
        }
		    
		if(product.getProductVariant() != null) {
			dto.setVariants(product.getProductVariant()
					.stream()
					.map(variant -> {
						ProductVariantDTO v = new ProductVariantDTO();
						v.setId(variant.getId());
                        v.setSize(variant.getSize());
                        v.setColor(variant.getColor());
                        v.setQuantity(variant.getQuantity());
                        v.setPrice(variant.getPrice());
                        return v;					
					})
					.collect(Collectors.toList())
					);
		}

		return dto;
	}

}
