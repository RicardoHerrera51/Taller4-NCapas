package com.grupo13.Taller4.repositories;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.grupo13.Taller4.models.entities.Playlist;
import com.grupo13.Taller4.models.entities.User;


public interface PlaylistRepository
	extends JpaRepository<Playlist, UUID>{
	
	Optional<Playlist> findByTitle(String title);
	
	Playlist findByCode(UUID playlistCode);
	
	List<Playlist> findByUserCode(UUID userId);
	
	Page<Playlist> findAllByUser(User user , Pageable pageabel);


}
