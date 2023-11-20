package com.grupo13.Taller4.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grupo13.Taller4.models.dtos.AddSongDTO;
import com.grupo13.Taller4.models.dtos.AddSongToPlaylistDTO;
import com.grupo13.Taller4.models.dtos.PageDTO;
import com.grupo13.Taller4.models.dtos.PlaylistDTO;
import com.grupo13.Taller4.models.dtos.PlaylistDetailsDTO;
import com.grupo13.Taller4.models.dtos.ResponsePlaylistDTO;
import com.grupo13.Taller4.models.dtos.SongDTO;
import com.grupo13.Taller4.models.dtos.SongPlaylistPageDTO;
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
		String message = "";

		if (valid.hasErrors())
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (user == null) {
			message = "Usuario no encontrado";
			return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
		}

		boolean request = playlistServices.save(info, user);

		if (!request) {
			message = "Ya tienes una Playlist con ese mismo nombre";
			return new ResponseEntity<>(message, HttpStatus.CONFLICT);
		} else {
			message = "Creacion de playlist exitosa";
			return new ResponseEntity<>(message, HttpStatus.CREATED);
		}
	}
	

	@GetMapping("/user/playlist")
	public ResponseEntity<?> findAllPlaylistByUser(@RequestParam(value = "keyword", required = false) String Keyword , 
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size,
			@RequestHeader("Authorization") String bearerToken) throws Exception{
		
	
		
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		if(Keyword == null) {
			
			Page<Playlist> playlist = playlistServices.finAllByUser(user.getUsername(),page,size);
		
			return new ResponseEntity<>(new PageDTO<Playlist>(
						
					playlist.getContent(),
					playlist.getNumber(),
					playlist.getSize(),
					playlist.getTotalElements(),
					playlist.getTotalPages()
					
					),
					 HttpStatus.OK);
		}else {
			ResponsePlaylistDTO filterPlaylist = playlistServices.searchPlaylistsByKeyword(user.getUsername(),Keyword,page,size);
			return new ResponseEntity<>(new PageDTO<Playlist>(
					
					filterPlaylist.getMatchinPlaylist(),
					filterPlaylist.getPages().getNumber(),
					filterPlaylist.getPages().getSize(),
					filterPlaylist.getPages().getTotalElements(),
					filterPlaylist.getPages().getTotalPages()
					
					), 
					HttpStatus.OK);
		}
		
	}
	
	
	@PostMapping("/playlist/")
	private ResponseEntity<?> AddSongToPlaylist(@RequestParam("playlistCode") String playlistCode,
			@RequestBody @Valid AddSongDTO info, BindingResult valid , @RequestHeader("Authorization") String bearerToken) throws Exception {
		String message = "";
		
		if (valid.hasErrors()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		AddSongToPlaylistDTO song = new AddSongToPlaylistDTO();
		song.setPlaylistCode(playlistCode);
		song.setSongCode(info.getCodeSong());

		System.out.println(song);
		boolean agregate = playlistServices.addSongToPlaylist(song);

		if (agregate == false) {
		
			message = "Esta cancion ya pertenece a la playlist";
			return new ResponseEntity<>(message, HttpStatus.CONFLICT);
		} else {

			
			message = "Se agrego la cancion correctamente";
			return new ResponseEntity<>(message, HttpStatus.OK);
		}

	}
	
	@GetMapping("/playlist/")
	public ResponseEntity<?> getDetailsPlaylist(@RequestParam("playlistCode") String playlistCode, 
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size,
			@RequestHeader("Authorization") String bearerToken) {
	
	    try {
	        PlaylistDetailsDTO newPlaylistDetails = playlistServices.getPlaylistDetails(playlistCode,page,size);
	
	    

	      return new ResponseEntity<>(
	        		new  SongPlaylistPageDTO(
	    	        		newPlaylistDetails.getTitle(),
	    	        		newPlaylistDetails.getDescription(),
	    	        		new PageDTO<SongDTO>(newPlaylistDetails.getSongs(),
	    	    	        		newPlaylistDetails.getPage().getNumber(),
	    	    	        		newPlaylistDetails.getPage().getSize(),
	    	    	        		newPlaylistDetails.getPage().getTotalElements(),
	    	    	        		newPlaylistDetails.getPage().getTotalPages()
	    	    	        		),
	    	        		newPlaylistDetails.getTotalDuration()), HttpStatus.OK);
	    }  catch (Exception e) {
	       
	    	String message = "Ocurrió un error al intentar obtener los detalles de la playlist";
	        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@DeleteMapping("/playlist/delete")
	public ResponseEntity<?> deletePlaylist(@RequestParam("playlistCode") String playlistCode, @RequestHeader("Authorization") String bearerToken) throws Exception {
		String message = "";
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (user == null) {
			message = "Usuario no encontrado";
			return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
		}
		
		boolean deleteRequest = playlistServices.deletePlaylist(playlistCode, user);
		System.out.println(deleteRequest);
		
		if (!deleteRequest) {
			message = "La playlist que desea eliminar no existe dentro de su biblioteca";
			return new ResponseEntity<>(message, HttpStatus.CONFLICT);
		} else {
			message = "La playlist ha sido eminada exitosamente";
			return new ResponseEntity<>(message, HttpStatus.NO_CONTENT);
		}
		
	}
	
	@DeleteMapping("/playlist/song/delete")
	public ResponseEntity<?> deleteSongFromPlaylist(@RequestParam("playlistCode") String playlistCode, @RequestParam("songCode") String songCode, @RequestHeader("Authorization") String bearerToken) throws Exception
	{
		String message = "";
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (user == null) {
			message = "Usuario no encontrado";
			return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
		}
		
		boolean deleteSongRequest = playlistServices.deleteSongFromPlaylist(playlistCode, songCode,  user);
		
		if (!deleteSongRequest) {
			message = "La cancion o el nombre de la plylist no es valido";
			return new ResponseEntity<>(message, HttpStatus.CONFLICT);
		} else {
			message = "La canción a sido elimanda exitosamente de la playlist";
			return new ResponseEntity<>(message, HttpStatus.NO_CONTENT);
		}
		
	}


}
