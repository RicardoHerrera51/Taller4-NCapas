package com.grupo13.Taller4.services.implementations;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.grupo13.Taller4.models.dtos.AddSongToPlaylistDTO;
import com.grupo13.Taller4.models.dtos.PlaylistDTO;
import com.grupo13.Taller4.models.dtos.PlaylistDetailsDTO;
import com.grupo13.Taller4.models.dtos.ResponsePlaylistDTO;
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

	public PlaylistDetailsDTO getPlaylistDetails(String playlistCode, int page, int size)  throws Exception  {
		 UUID codeplylist = UUID.fromString(playlistCode);
		 
		 Playlist playlist = playlistRepository.findById(codeplylist)
	                .orElseThrow(() -> new NotFoundException());

	        if (playlist == null) {
	            throw new NotFoundException();
	        }
 ;
	 //Convert to Page
		Pageable pageable = PageRequest.of(page, size);
	  	
	    List<SongXPlaylist> songXPlaylists = playlist.getSongs();
	    int start = (int) pageable.getOffset();
	    int end = Math.min((start + pageable.getPageSize()), songXPlaylists.size());
	    List<SongXPlaylist> paginatedSongs = songXPlaylists.subList(start, end);
	    Page<SongXPlaylist> songsPage = new PageImpl<>(paginatedSongs, pageable, songXPlaylists.size());

       List<SongDTO> songDTOs = new ArrayList<>();
       int totalDurationInSeconds = 0;
       
       for (SongXPlaylist songXPlaylist : songsPage) {
           Song song = songXPlaylist.getSong();
           int durationInSeconds = song.getDuration();
           totalDurationInSeconds = totalDurationInSeconds + song.getDuration();
           
           int minutes = durationInSeconds / 60;
           int seconds = durationInSeconds % 60;
           String durationFormatted = String.format("%02d:%02d", minutes, seconds);

           SongDTO songDTO = new SongDTO(song.getTitle(), durationFormatted, songXPlaylist.getSaveDate(),song.getUrl(),song.getAlbum_cover(),song.getArtist());
           songDTOs.add(songDTO);
       }
      
     

       int totalDurationInMinutes = totalDurationInSeconds / 60;
       int totalDurationSeconds = totalDurationInSeconds % 60;
       String totalDurationFormatted = String.format("%02d:%02d", totalDurationInMinutes, totalDurationSeconds);

       return new PlaylistDetailsDTO(playlist.getTitle(), playlist.getDescription(), songDTOs, totalDurationFormatted,songsPage);
   }
	
	@Override
	public ResponsePlaylistDTO searchPlaylistsByKeyword(String username, String keyword, int page ,int size) {
			
		 Page<Playlist> userPlaylists = finAllByUser(username,page,size);
		 
	        List<Playlist> matchingPlaylists = new ArrayList<>();

	        for (Playlist playlist : userPlaylists) {
	            if (playlist.getTitle().toLowerCase().contains(keyword.toLowerCase())) {
	                matchingPlaylists.add(playlist);
	            }
	        }
	        
	        ResponsePlaylistDTO response = new ResponsePlaylistDTO(userPlaylists,matchingPlaylists);
	        return response;
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

	@Override
	public Page<Playlist> finAllByUser(String username, int page, int size) {
		User user = userServices.findByName(username);
		Pageable pageable = PageRequest.of(page, size,Sort.by("title").ascending());
		return playlistRepository.findAllByUser(user, pageable);
	}
	
	//Delete play list


	@Override
	@Transactional(rollbackOn = Exception.class)
	public boolean deletePlaylist(String info, User user_code) throws Exception {
		UUID playlistCode = UUID.fromString(info);
		UUID extra = null;

		List<Playlist> existplaylists = playlistRepository.findByUserCode(user_code.getCode());
		Playlist existPlaylist = playlistRepository.findByCode(playlistCode);

		if (existPlaylist == null)
			return false;

		for (Playlist playlist : existplaylists) {
			if (playlist.getTitle().equals(existPlaylist.getTitle()))
				extra = playlist.getCode();

		}

		if (extra == null)
			return false;
		
		List<SongXPlaylist> songsInPlaylist = songXPlaylistRepository
				.findByPlaylist(playlistRepository.findByCode(playlistCode));

		// delete all song by play list
		songXPlaylistRepository.deleteAll(songsInPlaylist);

		playlistRepository.deleteById(playlistCode);

		return true;

	}
	
	@Override
	@Transactional(rollbackOn = Exception.class)
	public boolean deleteSongFromPlaylist(String playlistCode, String songCode, User user_code) throws Exception {
			UUID codeplaylist = UUID.fromString(playlistCode);
			UUID codeSong = UUID.fromString(songCode);
		
		//TODO: optimize play list repository, improve efficiency
		List<Playlist> existplaylist = findAllByUserId(user_code.getUsername());
		existplaylist = findAllByUserId(user_code.getEmail());
		//all play list by user
		
		for (Playlist playlist : existplaylist)
		{
			if(!playlist.getTitle().equals(playlistRepository.findByCode(codeplaylist).getTitle())) return false;
				//play list delete not found
		}
		
		//find song in play list
		 SongXPlaylist songXPlaylist = songXPlaylistRepository.findByPlaylistAndSong(playlistRepository.findByCode(codeplaylist),songRepository.findByCode(codeSong));
		 if (songXPlaylist == null)  return false; // song not associated with play list
	  
		 songXPlaylistRepository.delete(songXPlaylist);
		return true;
	}


}
