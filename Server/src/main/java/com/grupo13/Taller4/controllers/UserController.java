package com.grupo13.Taller4.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grupo13.Taller4.models.dtos.LoginDTO;
import com.grupo13.Taller4.models.dtos.ProfileDTO;
import com.grupo13.Taller4.models.dtos.RegisterUserDTO;
import com.grupo13.Taller4.models.dtos.TokenDTO;
import com.grupo13.Taller4.models.entities.Token;
import com.grupo13.Taller4.models.entities.User;
import com.grupo13.Taller4.services.UserServices;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class UserController {
	@Autowired
	private UserServices userServices;

	@PostMapping("/signup")
	private ResponseEntity<?> registerUser(@RequestBody @Valid RegisterUserDTO info, BindingResult valid)
			throws Exception {
		User user = userServices.findByName(info.getUsername());
		User email = userServices.findByName(info.getEmail());

		if (valid.hasErrors())
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		if (user != null || email != null) {
			String message = "";

			if (user != null) {
				message = "Usuario ya registrado";
			}
			if (email != null) {
				message = "Correo ya registrado ya registrado";
			}

			return new ResponseEntity<>(message, HttpStatus.CONFLICT);
		}

		try {
			userServices.register(info);

			String message = "Registro exitoso";

			return new ResponseEntity<>(message, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody @Valid LoginDTO info, BindingResult validations) throws Exception {

		if (validations.hasErrors())
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		User user = userServices.findByName(info.getIdentifier());

		if (user == null) {

			String response = "Intento de inicio de sesion fallido identificador de usuario no encontrado";
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}

		if (!userServices.comparePassword(info.getPassword(), user.getPassword()))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try {
			Token token = userServices.registerToken(user);
			return new ResponseEntity<>(new TokenDTO(token), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/logout")
	public ResponseEntity<?> logOut(@RequestHeader("Authorization") String bearerToken) throws Exception {
		String message = " ";
		if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
			String seccionToken = bearerToken.substring(7);

			boolean request = userServices.logOut(seccionToken);

			if (!request) {
				message = "El cierre de seción no fue exitoso , intentelo nuevamente";
				return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
			} else {
				message = "Cierre de sección exitoso";
				return new ResponseEntity<>(message, HttpStatus.OK);
			}
		} else {
			message = "Parace que hay problemas con tu token :)";
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		}

	}
	
	@GetMapping("/profile")
	public ResponseEntity<?> infoProfile(@RequestHeader("Authorization") String bearerToken) {
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		ProfileDTO profile = userServices.dataProfileUser(user);

		if (profile == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		return new ResponseEntity<>(profile, HttpStatus.OK);
	}

	@PatchMapping("/profile/image")
	public ResponseEntity<?> imageProfile(@RequestParam("image") String newImage,
			@RequestHeader("Authorization") String bearerToken) {
		String message = " ";
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		boolean request = userServices.profilePhotoUpdate(user, newImage);

		if (!request) {
			message = "No pudo realizarce la actualización";
			return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
		} else {
			message = "Actualización de foto de perfil exitosa";
			return new ResponseEntity<>(message, HttpStatus.OK);
		}
	}

}
