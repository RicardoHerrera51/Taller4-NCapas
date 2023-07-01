package com.grupo13.Taller4.models.dtos;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SongPlaylistPageDTO {
	
	private String title;
    private String description;
    private PageDTO<SongDTO> page;
    private String totalDuration;

}
