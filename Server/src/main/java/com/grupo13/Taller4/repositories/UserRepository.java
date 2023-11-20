package com.grupo13.Taller4.repositories;

import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.grupo13.Taller4.models.entities.User;

	
public interface UserRepository 
 extends ListCrudRepository<User,UUID> {

	boolean existsByUsername(String username);
	boolean existsByEmail(String email);
	User findByUsernameOrEmail(String username, String email);
	User findByUsername(String username);
	User findByEmail(String email);
	User findOneByCode(UUID code);
}