package com.shopkart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.shopkart.dto.AddToCartDTO;
import com.shopkart.dto.CartDTO;
import com.shopkart.dto.UpdateCartDTO;
import com.shopkart.service.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {

	@Autowired
	private CartService cartService;

	@GetMapping("/view")
	public ResponseEntity<?> viewCart() {
		return new ResponseEntity<CartDTO>(cartService.getCart(), HttpStatus.OK);
	}

	@PostMapping("/add")
	public ResponseEntity<?> addToCart(@RequestBody AddToCartDTO productData) {
		System.out.println("ddd");
		String ss = cartService.addToCart(productData.getVariantId(), productData.getQuantity());
		return new ResponseEntity<String>(ss, HttpStatus.OK);
	}

	@PostMapping("/updateQuantity")
	public ResponseEntity<?> updateCart(@RequestBody UpdateCartDTO data) {
		return new ResponseEntity<CartDTO>(cartService.updateCartItemQuantity(data.getCartItemId(), data.getQuantity()),
				HttpStatus.OK);
	}

	@DeleteMapping("/delete/{cartItemId}")
	public ResponseEntity<?> removeItem(@PathVariable("cartItemId") Integer cartItemId) {
		return new ResponseEntity<CartDTO>(cartService.deleteItem(cartItemId), HttpStatus.OK);
	}
	

}
