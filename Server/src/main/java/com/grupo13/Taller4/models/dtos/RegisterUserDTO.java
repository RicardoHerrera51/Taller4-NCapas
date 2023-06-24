package com.grupo13.Taller4.models.dtos;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterUserDTO {

	@NotEmpty
	private String username;

	@NotEmpty
	@Email
	private String email;

	@NotEmpty
	@Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$", message = "La contraseña no cumple con los requisitos.")
	private String password;
}