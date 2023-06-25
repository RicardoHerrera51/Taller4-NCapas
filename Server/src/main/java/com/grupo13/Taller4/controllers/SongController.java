package com.grupo13.Taller4.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grupo13.Taller4.models.dtos.PageDTO;
import com.grupo13.Taller4.models.dtos.SongsDTO;
import com.grupo13.Taller4.models.entities.Song;
import com.grupo13.Taller4.services.SongServices;
import com.grupo13.Taller4.utils.SongsConvert;

@RestController
@RequestMapping("/song")
@CrossOrigin("*")
public class SongController {
	@Autowired
	private SongServices songServices;
	
	@Autowired
	SongsConvert songsConvert;

	@GetMapping("/")
	public ResponseEntity<?> SearchSongs(@RequestParam(value = "title", required = false) String titleFragment, 
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
			@RequestHeader("Authorization") String bearerToken) {
		
		if (titleFragment != null) {
			List<Song> songs = songServices.searchSongByKeyword(titleFragment, page, size).getMatchingSong();
			Page<Song> songPages = songServices.searchSongByKeyword(titleFragment, page, size).getPages();
			
			List<SongsDTO> convertedSongs = songsConvert
					.convertSecondsToMinutes(songs);
			
			return new ResponseEntity<>( new PageDTO<SongsDTO>(
					
					convertedSongs,
					songPages.getNumber(),
					songPages.getSize(),
					songPages.getTotalElements(),
					songPages.getTotalPages()

					),
					 HttpStatus.OK);
		} else {
			Page<Song> songs = songServices.findAll(page,size);
			List<SongsDTO> convertedSongs = songsConvert.convertSecondsToMinutes(songs.getContent());
			return new ResponseEntity<>(new PageDTO<SongsDTO>(
					convertedSongs,
					songs.getNumber(),
					songs.getSize(),
					songs.getTotalElements(),
					songs.getTotalPages()
					
					),
					 HttpStatus.OK);
		}
	}

}
