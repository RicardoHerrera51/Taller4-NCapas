package com.grupo13.Taller4.models.entities;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@Table(name = "songx_playlist")
public class SongXPlaylist {
	@Id
	@Column(name = "code")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID code;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "song_code", nullable = false)
    private Song song;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "playlist_code", nullable = false)
    private Playlist playlist;

 
    @NotNull()
    @Column(name="date_added")
    private java.sql.Date saveDate;

    // Constructor
    public SongXPlaylist(Playlist playlist, Song song, java.sql.Date savedDate) {
        this.playlist = playlist;
        this.song = song;
        this.saveDate = savedDate;
    }
}
