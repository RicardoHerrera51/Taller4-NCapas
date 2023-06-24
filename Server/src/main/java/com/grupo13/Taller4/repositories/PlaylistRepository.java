package com.grupo13.Taller4.repositories;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

import org.springframework.data.repository.ListCrudRepository;
import com.grupo13.Taller4.models.entities.Playlist;


public interface PlaylistRepository
	extends ListCrudRepository<Playlist, UUID>{
	
	Optional<Playlist> findByTitle(String title);
	
	Playlist findByCode(UUID playlistCode);
	
	List<Playlist> findByUserCode(UUID userId);
	


}
