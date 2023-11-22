package com.grupo13.Taller4.models.dtos;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SongDTO {
	private String title;
    private String duration;
    private Date addedDate;
    private String url;
    private String album_cover;
    private String artist;
}
