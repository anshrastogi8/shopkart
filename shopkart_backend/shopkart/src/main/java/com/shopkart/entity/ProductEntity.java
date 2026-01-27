package com.shopkart.entity;

import java.sql.Timestamp;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="products")
public class ProductEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	@ManyToOne
    @JoinColumn(name="category_id")
    CategoryEntity category;

    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    SubCategoryEntity subcategory;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    List<ProductVariantEntity> productVariant;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    List<ProductImagesEntity> productImages;
	
	String title;
	String description;
	Integer price;
	Integer previousPrice;
	Integer rating;
	Integer reviews;
	String itemSold;
	String sku;
	String material;
	String care;
	String tag;
	Timestamp createdOn;

	
}
