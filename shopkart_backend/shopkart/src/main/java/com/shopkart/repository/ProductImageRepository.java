package com.shopkart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shopkart.entity.ProductImagesEntity;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImagesEntity, Integer>{

}
