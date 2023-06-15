package com.pedroalmeida.gamebuddy.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
    private List<String> participants;
}