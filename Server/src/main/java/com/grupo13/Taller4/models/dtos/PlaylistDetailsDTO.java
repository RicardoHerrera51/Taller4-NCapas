package com.grupo13.Taller4.models.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class PlaylistDetailsDTO {
	
	private String title;
    private String description;
    private List<SongDTO> songs;
    private String totalDuration;

}
