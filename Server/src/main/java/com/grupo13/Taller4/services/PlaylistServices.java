package com.grupo13.Taller4.services;

import java.util.List;

import org.springframework.data.domain.Page;

import com.grupo13.Taller4.models.dtos.AddSongToPlaylistDTO;
import com.grupo13.Taller4.models.dtos.PlaylistDTO;
import com.grupo13.Taller4.models.dtos.PlaylistDetailsDTO;
import com.grupo13.Taller4.models.dtos.ResponsePlaylistDTO;
import com.grupo13.Taller4.models.entities.Playlist;
import com.grupo13.Taller4.models.entities.Song;
import com.grupo13.Taller4.models.entities.User;


public interface PlaylistServices {

	boolean save (PlaylistDTO info , User user_code) throws Exception;
	boolean addSongToPlaylist(AddSongToPlaylistDTO info)  throws Exception;
	boolean deletePlaylist(String playlistCode , User user_code) throws Exception;
	PlaylistDetailsDTO getPlaylistDetails(String playlistCode , int page, int size)  throws Exception;
	ResponsePlaylistDTO searchPlaylistsByKeyword(String username, String keyword, int page ,int size);
	
	Page<Playlist> finAllByUser(String id,int page, int size);
	List<Playlist> findAllByUserId(String id) throws Exception;
	List<Song> findSongsByPlaylistCode(String id) throws Exception;
	int TotalDurationOfPlaylist(String id);
}
