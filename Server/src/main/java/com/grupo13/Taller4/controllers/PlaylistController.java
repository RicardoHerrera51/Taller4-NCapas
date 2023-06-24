package com.grupo13.Taller4.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.grupo13.Taller4.models.dtos.AddSongDTO;
import com.grupo13.Taller4.models.dtos.AddSongToPlaylistDTO;
import com.grupo13.Taller4.models.dtos.GetPlaylistDTO;
import com.grupo13.Taller4.models.dtos.PlaylistDTO;
import com.grupo13.Taller4.models.dtos.PlaylistDetailsDTO;
import com.grupo13.Taller4.models.entities.Playlist;
import com.grupo13.Taller4.models.entities.User;
import com.grupo13.Taller4.services.PlaylistServices;
import com.grupo13.Taller4.services.SongServices;
import com.grupo13.Taller4.services.UserServices;

import jakarta.validation.Valid;


@RequestMapping("/")
@RestController
@CrossOrigin("*")
public class PlaylistController {
	@Autowired
	PlaylistServices playlistServices;
	
	@Autowired
	SongServices songServices;
	
	@Autowired
	UserServices userServices;
	
	@PostMapping("/playlist")
	private ResponseEntity<?> createPlaylist(@RequestBody @Valid PlaylistDTO info, BindingResult valid,
			@RequestHeader("Authorization") String bearerToken) throws Exception {

		if (valid.hasErrors())
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (user == null) {
			String response = "Usuario no encontrado";
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}

		boolean request = playlistServices.save(info, user);

		if (!request) {
			String response = "Ya tienes una Playlist con ese mismo nombre";
			return new ResponseEntity<>(response, HttpStatus.CONFLICT);
		} else {
			String response = "Creacion de playlist exitosa";
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		}
	}
	
	
	
	@GetMapping("/user/playlist")
	public ResponseEntity<?> findAllPlaylistByUser(@RequestBody @Valid GetPlaylistDTO info,  BindingResult valid , @RequestHeader("Authorization") String bearerToken) throws Exception{
		
		if (valid.hasErrors()) 
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		if(info.getKeyword() == null) {
			
			List<Playlist> playlist = playlistServices.findAllByUserId(user.getUsername());
		
			return new ResponseEntity<>(playlist , HttpStatus.OK);
		}else {
			List<Playlist> filterPlaylist = playlistServices.searchPlaylistsByKeyword(user.getUsername(),info.getKeyword());
			return new ResponseEntity<>(filterPlaylist, HttpStatus.OK);
		}
		
	}
	
	
	@PostMapping("/playlist/")
	private ResponseEntity<?> AddSongToPlaylist(@RequestParam("playlistCode") String playlistCode,
			@RequestBody @Valid AddSongDTO info, BindingResult valid , @RequestHeader("Authorization") String bearerToken) throws Exception {
	
		
		if (valid.hasErrors()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		AddSongToPlaylistDTO song = new AddSongToPlaylistDTO();
		song.setPlaylistCode(playlistCode);
		song.setSongCode(info.getCodeSong());

		System.out.println(song);
		boolean agregate = playlistServices.addSongToPlaylist(song);

		if (agregate == false) {
		
			String message = "Esta cancion ya pertenece a la playlist";
			return new ResponseEntity<>(message, HttpStatus.CONFLICT);
		} else {

			
			String message = "Se agrego la cancion correctamente";
			return new ResponseEntity<>(message, HttpStatus.OK);
		}

	}
	
	@GetMapping("/playlist/")
	public ResponseEntity<?> getDetailsPlaylist(@RequestParam("playlistCode") String playlistCode, @RequestHeader("Authorization") String bearerToken) {
		
	    try {
	        PlaylistDetailsDTO newPlaylistDetails = playlistServices.getPlaylistDetails(playlistCode);
	        return new ResponseEntity<>(newPlaylistDetails, HttpStatus.OK);
	    }  catch (Exception e) {
	       
	        String message = "Ocurrió un error al intentar obtener los detalles de la playlist";
	        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	

}
