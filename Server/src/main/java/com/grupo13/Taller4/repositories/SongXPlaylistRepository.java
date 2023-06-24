package com.grupo13.Taller4.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.grupo13.Taller4.models.entities.Playlist;
import com.grupo13.Taller4.models.entities.SongXPlaylist;



public interface SongXPlaylistRepository 
extends ListCrudRepository<SongXPlaylist, UUID>{
List<SongXPlaylist> findByPlaylist(Playlist playlist);
}