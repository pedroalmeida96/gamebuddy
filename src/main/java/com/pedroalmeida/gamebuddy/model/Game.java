package com.pedroalmeida.gamebuddy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Game {
    @Id
    private String id;
    private GameType gameType;
    private String location;
    private LocalDateTime gameDateTime;
    private boolean isFull;
    @ManyToMany
    private List<AppUser> participants;
}