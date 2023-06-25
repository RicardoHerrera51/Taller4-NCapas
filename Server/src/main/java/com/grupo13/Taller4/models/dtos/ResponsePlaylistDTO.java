package com.grupo13.Taller4.models.dtos;

import java.util.List;

import org.springframework.data.domain.Page;

import com.grupo13.Taller4.models.entities.Playlist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponsePlaylistDTO {
	Page<Playlist> pages;
	List<Playlist> matchinPlaylist;
}
