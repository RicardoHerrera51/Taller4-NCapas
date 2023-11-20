package com.grupo13.Taller4.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.grupo13.Taller4.models.entities.Song;


public interface SongRepository
extends JpaRepository<Song,UUID>{

	List<Song> findByTitle(String title);
	Song findByCode(UUID songCode);

}