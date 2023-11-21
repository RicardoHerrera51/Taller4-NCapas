package com.grupo13.Taller4.utils;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.grupo13.Taller4.models.dtos.SongsDTO;
import com.grupo13.Taller4.models.entities.Song;


@Component
public class SongsConvert {

	public List<SongsDTO> convertSecondsToMinutes(List<Song> songs) {
    	List<SongsDTO> response = new ArrayList<>();
        for (Song song : songs) {
            int duration = song.getDuration();
            int minutes = duration / 60;
            int seconds = duration % 60;
            String formattedDuration = String.format("%d:%02d", minutes, seconds);
            SongsDTO newDTO= new SongsDTO(song.getCode().toString(),song.getTitle(), song.getArtist(), formattedDuration, song.getUrl(),song.getAlbum_cover());
            response.add(newDTO);
        }
        return response;
    }

}