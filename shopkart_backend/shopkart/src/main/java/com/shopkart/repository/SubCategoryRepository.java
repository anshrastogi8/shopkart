package com.shopkart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shopkart.entity.SubCategoryEntity;
import java.util.List;


@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategoryEntity, Integer> {
	
	List<SubCategoryEntity> findByCategoryIdOrderBySubcategoryNameAsc(Integer categoryId);

}
