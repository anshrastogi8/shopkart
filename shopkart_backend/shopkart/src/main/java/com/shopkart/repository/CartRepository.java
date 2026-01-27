package com.shopkart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.shopkart.entity.CartEntity;
import com.shopkart.entity.UserEntity;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Integer> {

	public Optional<CartEntity> findByUser(UserEntity user);

	@Query(value = """
		    select
		        c.id AS cartId,
		        ci.id AS cartItemId,
		        ci.quantity AS quantity,
		        ci.unit_price AS unitPrice,
		        cv.id AS variantId,
		        cv.size AS variantSize,
		        cv.color AS variantColor,
		        cv.price AS variantPrice,
		        p.id AS productId,
		        p.title AS productTitle,
		        pi.images AS productImage
		    FROM cart AS c
		    INNER JOIN cart_items AS ci ON c.id = ci.cart_id
		    INNER JOIN product_variant AS cv ON ci.product_variant_id = cv.id
		    INNER JOIN products AS p ON cv.product_id = p.id
		    LEFT JOIN product_images AS pi ON pi.product_id = p.id AND pi.image_order = 0
		    WHERE c.user_id = :userId ORDER BY ci.id ASC
		""", nativeQuery = true)
		List<Object[]> findCartItemsByUserId(@Param("userId") Integer userId);


}
