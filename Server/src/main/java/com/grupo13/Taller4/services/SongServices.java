package com.grupo13.Taller4.services;

import java.util.List;

import com.grupo13.Taller4.models.dtos.SaveSongDTO;
import com.grupo13.Taller4.models.entities.Song;

public interface SongServices {
	
	void save(SaveSongDTO info) throws Exception;
	Song findById(String id);

	List<Song> searchSongByKeyword(String keyword);
	List<Song> findAll();

}