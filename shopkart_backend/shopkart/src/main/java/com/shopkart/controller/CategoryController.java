package com.shopkart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.shopkart.entity.CategoryEntity;
import com.shopkart.entity.SubCategoryEntity;
import com.shopkart.service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;

	
	@GetMapping("/getAll")
	public ResponseEntity<?> getAllCategoryData(){
		return new ResponseEntity<List<CategoryEntity>>(categoryService.categories(), HttpStatus.OK);
	}
	
	@GetMapping("getSubcategory/{categoryId}")
	public ResponseEntity<?> getSubCategoryByCategoryId(@PathVariable("categoryId") Integer categoryId){
		return new ResponseEntity<List<SubCategoryEntity>>(categoryService.getSubcategoryById(categoryId), HttpStatus.OK);
	}
}
