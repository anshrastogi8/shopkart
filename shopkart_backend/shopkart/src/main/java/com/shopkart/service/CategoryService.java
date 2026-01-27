package com.shopkart.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopkart.entity.CategoryEntity;
import com.shopkart.entity.SubCategoryEntity;
import com.shopkart.repository.CategoryRepository;
import com.shopkart.repository.SubCategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private SubCategoryRepository subCategoryRepository;
	
	 public List<CategoryEntity> categories() {
		    return categoryRepository.findAll();
	}
	 
	 public List<SubCategoryEntity> getSubcategoryById(Integer categoryId) {
		    return subCategoryRepository.findByCategoryIdOrderBySubcategoryNameAsc(categoryId);
	}
	
}
