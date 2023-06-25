package com.grupo13.Taller4.services;

import java.util.List;

import org.springframework.data.domain.Page;

import com.grupo13.Taller4.models.dtos.ResponseSongsDTO;
import com.grupo13.Taller4.models.dtos.SaveSongDTO;
import com.grupo13.Taller4.models.entities.Song;

public interface SongServices {
	
	void save(SaveSongDTO info) throws Exception;
	Song findById(String id);
	Page<Song> findAll(int page, int size);
	ResponseSongsDTO searchSongByKeyword(String keyword, int page, int size);
	List<Song> findAll();

}