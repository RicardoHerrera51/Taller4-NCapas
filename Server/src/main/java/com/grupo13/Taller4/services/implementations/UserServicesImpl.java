package com.grupo13.Taller4.services.implementations;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.grupo13.Taller4.models.dtos.ProfileDTO;
import com.grupo13.Taller4.models.dtos.RegisterUserDTO;
import com.grupo13.Taller4.models.entities.Token;
import com.grupo13.Taller4.models.entities.User;
import com.grupo13.Taller4.repositories.TokenRepository;
import com.grupo13.Taller4.repositories.UserRepository;
import com.grupo13.Taller4.services.UserServices;
import com.grupo13.Taller4.utils.JWTTools;

import jakarta.transaction.Transactional;

@Service
public class UserServicesImpl implements UserServices {

	@Autowired
	public PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TokenRepository tokenRepository;

	@Autowired
	private JWTTools jwtTools;

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void register(RegisterUserDTO info) throws Exception {
		User user = new User(info.getUsername(), info.getEmail(), passwordEncoder.encode(info.getPassword()));

		userRepository.save(user);

	}

	@Override
	public User findByName(String name) {
		User user = userRepository.findByUsername(name);

		if (user != null) {
			return user;
		}

		user = userRepository.findByEmail(name);

		return user;
	}

	@Override
	public boolean comparePassword(String toCompare, String current) {
		return passwordEncoder.matches(toCompare, current);
	}

	@Override
	public User findUserByToken(String token) {
		try {
			String username = jwtTools.getUsernameFrom(token);
			if (username == null)
				return null;

			User user = userRepository.findByUsername(username);
			if (user == null)
				return null;

			return user;

		} catch (Exception e) {
			return null;
		}
	}
	@Override
	@Transactional(rollbackOn = Exception.class)
	public Token registerToken(User user) throws Exception {
		cleanTokens(user);
		
		String tokenString = jwtTools.generateToken(user);
		Token token = new Token(tokenString, user);
		
		tokenRepository.save(token);
		
		return token;
	}

	@Override
	public Boolean isTokenValid(User user, String token) {
		try {
			cleanTokens(user);
			List<Token> tokens = tokenRepository.findByUserAndActive(user, true);
			
			tokens.stream()
				.filter(tk -> tk.getContent().equals(token))
				.findAny()
				.orElseThrow(() -> new Exception());
			
			return true;
		} catch (Exception e) {
			return false;
		}		
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void cleanTokens(User user) throws Exception {
		List<Token> tokens = tokenRepository.findByUserAndActive(user, true);
		
		tokens.forEach(token -> {
			if(!jwtTools.verifyToken(token.getContent())) {
				token.setActive(false);
				tokenRepository.save(token);
			}
		});
		
	}


	@Override
	public User findUserAuthenticated() {
		String username = SecurityContextHolder
			.getContext()
			.getAuthentication()
			.getName();
		
		return userRepository.findByUsernameOrEmail(username, username);
	}

	@Override
	public boolean profilePhotoUpdate(User user, String newUrl) {

		if (user == null)
			return false;

		user.setImage(newUrl);
		userRepository.save(user);
		return true;

	}

	@Override
	public ProfileDTO dataProfileUser(User user) {

		ProfileDTO profile = new ProfileDTO();
		profile.setGmail(user.getEmail());
		profile.setImage(user.getImage());

		return profile;
	}

}
