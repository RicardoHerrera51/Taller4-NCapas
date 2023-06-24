package com.grupo13.Taller4.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SongsDTO {
	
	@NotEmpty
	private String code;
	
	@NotEmpty
	private String title;
	
	@NotEmpty
	private String duration;
}
