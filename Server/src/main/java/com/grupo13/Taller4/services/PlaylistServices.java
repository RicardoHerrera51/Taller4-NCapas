package com.grupo13.Taller4.services;

import java.util.List;

import com.grupo13.Taller4.models.dtos.AddSongToPlaylistDTO;
import com.grupo13.Taller4.models.dtos.PlaylistDTO;
import com.grupo13.Taller4.models.dtos.PlaylistDetailsDTO;
import com.grupo13.Taller4.models.entities.Playlist;
import com.grupo13.Taller4.models.entities.Song;
import com.grupo13.Taller4.models.entities.User;


public interface PlaylistServices {

	boolean save (PlaylistDTO info , User user_code) throws Exception;
	boolean addSongToPlaylist(AddSongToPlaylistDTO info)  throws Exception;
	PlaylistDetailsDTO getPlaylistDetails(String playlistCode)  throws Exception;
	List<Playlist> searchPlaylistsByKeyword(String username, String keyword);
	
	
	List<Playlist> findAllByUserId(String id) throws Exception;
	List<Song> findSongsByPlaylistCode(String id) throws Exception;
	int TotalDurationOfPlaylist(String id);
}
