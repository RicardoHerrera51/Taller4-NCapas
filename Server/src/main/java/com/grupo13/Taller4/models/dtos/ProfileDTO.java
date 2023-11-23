package com.grupo13.Taller4.models.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {
	
	
	@Email
	@NotEmpty
	private String username;
	
	@Email
	@NotEmpty
	private String gmail;
	
	private String image;

}
