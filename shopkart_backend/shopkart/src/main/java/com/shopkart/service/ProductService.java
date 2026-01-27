package com.shopkart.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shopkart.dto.ProductDTO;
import com.shopkart.mapper.ProductEntityToDTO;
import com.shopkart.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	ProductEntityToDTO mapper;
	
	public List<ProductDTO> getBestSellerProduct(){
		return productRepository.findByTagIgnoreCase("best_sellers")
				.stream()
				.map(mapper::mapToDto)
				.collect(Collectors.toList());		
	}
	
	public List<ProductDTO> getProductsBySubcategory(Integer subcategoryId){	
		return productRepository.findBySubcategoryId(subcategoryId)
				.stream()
				.map(mapper::mapToDto)
				.collect(Collectors.toList());
	}
	
}
