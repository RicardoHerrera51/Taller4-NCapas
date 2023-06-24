package com.grupo13.Taller4.models.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Data
@NoArgsConstructor
@ToString(exclude = {"playlists"})
@Table(name = "song")
public class Song {
	@Id
	@Column(name = "code")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID code;

    @NotNull(message = "El título de la canción es obligatorio")
    @Size(max = 25, message = "El título de la canción debe tener como máximo 25 caracteres")
    @Column(name="title")
    private String title;

    @NotNull(message = "La duración de la canción es obligatoria")
    @Column(name="duration")
    private int duration;
    
    @OneToMany(mappedBy = "song", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<SongXPlaylist> playlists;

    // Constructor
    public Song(String title, int duration) {
        this.title = title;
        this.duration = duration;
    }
}