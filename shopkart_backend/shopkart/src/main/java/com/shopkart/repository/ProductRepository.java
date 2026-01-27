package com.shopkart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shopkart.entity.ProductEntity;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
	
	List<ProductEntity> findByTagIgnoreCase(String tag);
	
	List<ProductEntity> findBySubcategoryId(Integer subcategoryId);

}
