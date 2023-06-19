package com.pedroalmeida.gamebuddy.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "games")
public class Game {
    @Id
    private Long gameId;
    private GameType gameType;
    private String location;
    private LocalDateTime gameDateTime;
    private boolean isFull;
    private List<AppUser> participants;
}