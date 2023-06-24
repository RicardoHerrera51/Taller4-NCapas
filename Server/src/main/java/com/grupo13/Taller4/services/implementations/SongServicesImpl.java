package com.grupo13.Taller4.services.implementations;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo13.Taller4.models.dtos.SaveSongDTO;
import com.grupo13.Taller4.models.entities.Song;
import com.grupo13.Taller4.repositories.SongRepository;
import com.grupo13.Taller4.services.SongServices;

import jakarta.transaction.Transactional;

@Service
public class SongServicesImpl 
	implements SongServices {

	@Autowired
	SongRepository songRepository;

	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(SaveSongDTO info) throws Exception {
		Song song = new Song(info.getTitle(), info.getDuration());

		songRepository.save(song);
	}

	@Override
	public Song findById(String id) {
		try {
			UUID songId = UUID.fromString(id);
			return songRepository.findById(songId).orElse(null);
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public List<Song> searchSongByKeyword(String keyword) {

		List<Song> songsList = songRepository.findAll();
		List<Song> matchingSong = new ArrayList<>();

		for (Song songs : songsList) {
			if (songs.getTitle().toLowerCase().contains(keyword.toLowerCase())) {
				matchingSong.add(songs);
			}
		}
		return matchingSong;
	}

	@Override
	public List<Song> findAll() {
		return songRepository.findAll();
	}

}
