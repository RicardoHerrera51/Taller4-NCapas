package com.grupo13.Taller4.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo13.Taller4.models.dtos.LoginDTO;
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

}
