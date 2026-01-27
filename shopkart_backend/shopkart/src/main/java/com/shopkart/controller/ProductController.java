package com.shopkart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.shopkart.dto.ProductDTO;
import com.shopkart.service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {
	
	@Autowired
	ProductService productService;

	@GetMapping("/best-sellers")
	public ResponseEntity<?> getBestSellerProducts(){
		return new ResponseEntity<List<ProductDTO>>(productService.getBestSellerProduct(),HttpStatus.OK);
	}
	
	@GetMapping("/{subcategoryId}")
	public ResponseEntity<?> getProductsBySubcategory(@PathVariable("subcategoryId") Integer subcategoryId){
		return new ResponseEntity<List<ProductDTO>>(productService.getProductsBySubcategory(subcategoryId),HttpStatus.OK);
	}
}
