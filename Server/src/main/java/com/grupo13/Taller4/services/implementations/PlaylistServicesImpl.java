package com.grupo13.Taller4.services.implementations;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.grupo13.Taller4.models.dtos.AddSongToPlaylistDTO;
import com.grupo13.Taller4.models.dtos.PlaylistDTO;
import com.grupo13.Taller4.models.dtos.PlaylistDetailsDTO;
import com.grupo13.Taller4.models.dtos.SongDTO;
import com.grupo13.Taller4.models.entities.Playlist;
import com.grupo13.Taller4.models.entities.Song;
import com.grupo13.Taller4.models.entities.SongXPlaylist;
import com.grupo13.Taller4.models.entities.User;
import com.grupo13.Taller4.repositories.PlaylistRepository;
import com.grupo13.Taller4.repositories.SongRepository;
import com.grupo13.Taller4.repositories.SongXPlaylistRepository;
import com.grupo13.Taller4.services.PlaylistServices;
import com.grupo13.Taller4.services.UserServices;

import jakarta.transaction.Transactional;

@Service
public class PlaylistServicesImpl 
   implements PlaylistServices{
	
	@Autowired
	PlaylistRepository playlistRepository;

	@Autowired
	UserServices userServices;
	
	@Autowired
	SongRepository songRepository;
	
	@Autowired
	SongXPlaylistRepository songXPlaylistRepository;

	@Override
	@Transactional(rollbackOn = Exception.class)
	public boolean save(PlaylistDTO info, User user) throws Exception {
		
		List<Playlist> existplaylist = findAllByUserId(user.getUsername());
		existplaylist = findAllByUserId(user.getEmail());
		for (Playlist playlist : existplaylist)
		{
			if(playlist.getTitle().equals(info.getTitle())) return false;
				
		}
		
		Playlist playlist = new Playlist(
				info.getTitle(),
				info.getDescription(),
				user);

		playlistRepository.save(playlist);
		
		return true;
		
	}
	
	@Override
	@Transactional(rollbackOn = Exception.class)
	public boolean addSongToPlaylist(AddSongToPlaylistDTO info) throws Exception {
			 UUID codeplylist = UUID.fromString(info.getPlaylistCode());
	        Playlist playlist = playlistRepository.findById(codeplylist).orElseThrow(()-> new IllegalArgumentException("Playlist no encontrada"));
	        if (playlist == null) {
	        	 return false;
	        }

	        UUID codesong = UUID.fromString(info.getSongCode());
	        Song song = songRepository.findById(codesong).orElseThrow(()-> new IllegalArgumentException("Song no encontrada"));;
	        if (song == null) {
	            return false; 
	        }

	        List<SongXPlaylist> songsInPlaylist = playlist.getSongs();
	        for (SongXPlaylist songXPlaylist : songsInPlaylist) {
	            if (songXPlaylist.getSong().getCode().equals(codesong)) {
	                return false; 
	            }
	        }
	        
	        java.sql.Date currentDate = new java.sql.Date(System.currentTimeMillis());
	        SongXPlaylist songXPlaylist = new SongXPlaylist(playlist, song, currentDate);
	        songXPlaylistRepository.save(songXPlaylist);
	       
	        return true;
	    }

	public PlaylistDetailsDTO getPlaylistDetails(String playlistCode)  throws Exception  {
		 UUID codeplylist = UUID.fromString(playlistCode);
		 
		 Playlist playlist = playlistRepository.findById(codeplylist)
	                .orElseThrow(() -> new NotFoundException());

	        if (playlist == null) {
	            throw new NotFoundException();
	        }
 ;
       
       List<SongXPlaylist> songXPlaylists = playlist.getSongs();
       
       List<SongDTO> songDTOs = new ArrayList<>();
       int totalDurationInSeconds = 0;
       

       for (SongXPlaylist songXPlaylist : songXPlaylists) {
           Song song = songXPlaylist.getSong();
           int durationInSeconds = song.getDuration();
           totalDurationInSeconds = totalDurationInSeconds + song.getDuration();
           
           int minutes = durationInSeconds / 60;
           int seconds = durationInSeconds % 60;
           String durationFormatted = String.format("%02d:%02d", minutes, seconds);

           SongDTO songDTO = new SongDTO(song.getTitle(), durationFormatted, songXPlaylist.getSaveDate());
           songDTOs.add(songDTO);
       }
    

       int totalDurationInMinutes = totalDurationInSeconds / 60;
       int totalDurationSeconds = totalDurationInSeconds % 60;
       String totalDurationFormatted = String.format("%02d:%02d", totalDurationInMinutes, totalDurationSeconds);

       return new PlaylistDetailsDTO(playlist.getTitle(), playlist.getDescription(), songDTOs, totalDurationFormatted);
   }
	
	@Override
	public List<Playlist> searchPlaylistsByKeyword(String username, String keyword) {
			
		User user = userServices.findByName(username);
		 List<Playlist> userPlaylists = playlistRepository.findByUserCode(user.getCode());
		 
	        List<Playlist> matchingPlaylists = new ArrayList<>();

	        for (Playlist playlist : userPlaylists) {
	            if (playlist.getTitle().toLowerCase().contains(keyword.toLowerCase())) {
	                matchingPlaylists.add(playlist);
	            }
	        }

	        return matchingPlaylists;
	}


	@Override
	@Transactional(rollbackOn = Exception.class)
	public List<Playlist> findAllByUserId(String username) throws Exception {
		User user = userServices.findByName(username);
		return playlistRepository.findByUserCode(user.getCode());
			
	}

	@Override
	@Transactional(rollbackOn = Exception.class)
	public List<Song> findSongsByPlaylistCode(String id) throws Exception {
		UUID code = UUID.fromString(id);
		Playlist playlist = playlistRepository.findById(code)
				.orElseThrow(() -> new RuntimeException("Playlist not found"));

		return playlist.getSongs().stream().map(SongXPlaylist::getSong).collect(Collectors.toList());
	}

	@Override
	public int TotalDurationOfPlaylist(String id) {
		UUID code = UUID.fromString(id);
		int totalDuration = 0;

		Playlist playlist = playlistRepository.findById(code)
				.orElseThrow(() -> new IllegalArgumentException("Playlist no encontrada"));

		for (SongXPlaylist songXPlaylist : playlist.getSongs()) {
			totalDuration += songXPlaylist.getSong().getDuration();
		}

		return totalDuration;
	}




}
