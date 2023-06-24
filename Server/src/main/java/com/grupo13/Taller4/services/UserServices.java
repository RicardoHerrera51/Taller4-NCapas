package com.grupo13.Taller4.services;

import com.grupo13.Taller4.models.dtos.RegisterUserDTO;
import com.grupo13.Taller4.models.entities.Token;
import com.grupo13.Taller4.models.entities.User;


public interface UserServices {
	
	void register(RegisterUserDTO info) throws Exception;
	User findByName(String name);
	Boolean comparePassword(String toCompare, String current);
	
	
	// Token management
	User findUserByToken(String token);
	Token registerToken(User user) throws Exception;
	Boolean isTokenValid(User user, String token);
	void cleanTokens(User user) throws Exception;
	
	//Find User authenticated
	User findUserAuthenticated();
}
