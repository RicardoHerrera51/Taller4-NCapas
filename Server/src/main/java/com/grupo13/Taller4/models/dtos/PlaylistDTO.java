package com.grupo13.Taller4.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistDTO {
	

	@NotEmpty
	private String title;
	
	@NotEmpty
	private String description;
}
