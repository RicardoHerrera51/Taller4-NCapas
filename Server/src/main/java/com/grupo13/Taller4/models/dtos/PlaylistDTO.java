package com.grupo13.Taller4.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistDTO {
	

	@NotEmpty
	@Size(max = 30, message = "El título no puede tener más de 30 caracteres")
	private String title;
	
	@NotEmpty
	@Size(max = 40, message = "La descripción no puede tener más de 40 caracteres")
	private String description;
}
