package com.shopkart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.shopkart.entity.AddressEntity;
import com.shopkart.entity.UserEntity;

@Repository
public interface AddressRepository extends JpaRepository<AddressEntity, Integer> {

	List<AddressEntity> findByUserOrderByCreatedOnDesc(UserEntity user);

}
