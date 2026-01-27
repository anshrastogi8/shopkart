package com.shopkart.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shopkart.dto.CartDTO;
import com.shopkart.dto.CartItemDTO;
import com.shopkart.entity.CartEntity;
import com.shopkart.entity.CartItemEntity;
import com.shopkart.entity.ProductVariantEntity;
import com.shopkart.entity.UserEntity;
import com.shopkart.repository.CartItemRepository;
import com.shopkart.repository.CartRepository;
import com.shopkart.repository.ProductVariantRepository;
import jakarta.transaction.Transactional;

@Service
public class CartService {

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private CartItemRepository cartItemRepository;

	@Autowired
	private ProductVariantRepository productVariantRepository;

	@Autowired
	private AuthenticationService userService;

	private CartEntity getOrCreateCart(UserEntity user) {
		return cartRepository.findByUser(user).orElseGet(() -> {
			CartEntity cart = new CartEntity();
			cart.setUser(user);
			cart.setCreatedOn(new Timestamp(System.currentTimeMillis()));
			return cartRepository.save(cart);
		});
	}

	@Transactional
	public CartDTO getCart() {
		UserEntity user = userService.getAuthenticatedUser();
		List<Object[]> items = cartRepository.findCartItemsByUserId(user.getId());

		if (items == null || items.isEmpty()) {

			CartDTO emptyCart = new CartDTO();
			emptyCart.setCartId(getOrCreateCart(user).getId());
			emptyCart.setItems(new ArrayList<>());
			emptyCart.setTotalPrice(0.0);
			return emptyCart;
		}

		List<CartItemDTO> cartItems = new ArrayList<>();

		for (Object[] row : items) {
			CartItemDTO dto = new CartItemDTO();
			dto.setCartId(row[0] != null ? ((Number) row[0]).intValue() : null);
			dto.setCartItemId(row[1] != null ? ((Number) row[1]).intValue() : null);
			dto.setQuantity(row[2] != null ? ((Number) row[2]).intValue() : null);
			dto.setUnitPrice(row[3] != null ? ((Number) row[3]).doubleValue() : null);
			dto.setVariantId(row[4] != null ? ((Number) row[4]).intValue() : null);
			dto.setVariantSize(row[5] != null ? row[5].toString() : null);
			dto.setVariantColor(row[6] != null ? row[6].toString() : null);
			dto.setVariantPrice(row[7] != null ? ((Number) row[7]).doubleValue() : null);
			dto.setProductId(row[8] != null ? ((Number) row[8]).intValue() : null);
			dto.setProductTitle(row[9] != null ? row[9].toString() : null);
			dto.setProductImage(row[10] != null ? row[10].toString() : null);

			cartItems.add(dto);
		}
		CartDTO cart = new CartDTO();
		cart.setCartId(cartItems.get(0).getCartId());
		cart.setItems(cartItems);

		double totalPrice = cartItems.stream()
				.mapToDouble(item -> (item.getUnitPrice() != null ? item.getUnitPrice() : 0)
						* (item.getQuantity() != null ? item.getQuantity() : 0))
				.sum();
		cart.setTotalPrice(totalPrice);

		return cart;
	}

	@Transactional
	public String addToCart(Integer variantId, Integer quantity) {

		if (variantId == null) {
			throw new IllegalArgumentException("VariantId is required.");
		}

		if (quantity == null || quantity <= 0) {
			throw new IllegalArgumentException("Quantity is required.");
		}

		UserEntity user = userService.getAuthenticatedUser();
		CartEntity cart = getOrCreateCart(user);

		ProductVariantEntity variant = productVariantRepository.findById(variantId)
				.orElseThrow(() -> new RuntimeException("Product variant not found"));

		CartItemEntity cartItem = null;

		if (cart.getCartItems() != null) {
			cartItem = cart.getCartItems().stream()
					.filter(productId -> productId.getVariant().getId().equals(variantId)).findFirst().orElse(null);
		}

		if (cartItem == null) {
			cartItem = new CartItemEntity();
			cartItem.setCart(cart);
			cartItem.setCreatedOn(new Timestamp(System.currentTimeMillis()));
			cartItem.setQuantity(quantity);
			cartItem.setVariant(variant);
			cartItem.setUnitPrice(variant.getPrice());
			cartItemRepository.save(cartItem);
		} else {
			cartItem.setQuantity(cartItem.getQuantity() + quantity);
			cartItemRepository.save(cartItem);
		}
		return "ADDD";
	}

	public CartDTO updateCartItemQuantity(Integer cartItemId, Integer quantity) {
		UserEntity user = userService.getAuthenticatedUser();
		CartEntity cart = getOrCreateCart(user);

		CartItemEntity item = cart.getCartItems().stream().filter(i -> i.getId().equals(cartItemId)).findFirst()
				.orElseThrow(() -> new RuntimeException("Cart item not found"));

		if (quantity <= 0) {
			cart.getCartItems().remove(item);
			cartItemRepository.delete(item);
		} else {
			item.setQuantity(quantity);
			cartItemRepository.save(item);
		}

		return getCart();
	}

	@Transactional
	public CartDTO deleteItem(Integer cartItemId) {
		UserEntity user = userService.getAuthenticatedUser();
		CartEntity cart = getOrCreateCart(user);
		CartItemEntity item = cart.getCartItems().stream().filter(i -> i.getId().equals(cartItemId)).findFirst()
				.orElseThrow(() -> new RuntimeException("Cart item not found"));

		cart.getCartItems().remove(item);
		cartItemRepository.delete(item);
		return getCart();
	}

}
