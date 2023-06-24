package com.grupo13.Taller4.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.grupo13.Taller4.models.entities.Token;
import com.grupo13.Taller4.models.entities.User;


public interface TokenRepository 
extends ListCrudRepository<Token, UUID>{ 
	
	Token findByContent(String content);
	List<Token> findByUserAndActive(User user, Boolean active);

}