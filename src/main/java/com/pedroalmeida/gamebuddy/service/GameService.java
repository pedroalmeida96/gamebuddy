package com.pedroalmeida.gamebuddy.service;

import com.pedroalmeida.gamebuddy.model.AppUser;
import com.pedroalmeida.gamebuddy.model.Game;
import com.pedroalmeida.gamebuddy.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameService {
    private final PlayersValidator playerValidator;
    private final GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Optional<Game> getGameById(String gameId) {
        return gameRepository.findById(gameId);
    }

    public Game createGame(Game game) {
        if (game.getParticipants().isEmpty()) {
            throw new IllegalArgumentException("No participants");
        }
        if (game.getGameDateTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("The game date time must be in the future.");
        }
        game.setNumPlayers(game.getParticipants().size());
        return gameRepository.save(game);
    }

    public Game updateGame(Game updatedGame) {
        Game dbGame = gameRepository.findById(updatedGame.getGameId())
                .orElseThrow(() -> new IllegalArgumentException("Game not found"));
        if (updatedGame.getGameType() != null) {
            dbGame.setGameType(updatedGame.getGameType());
        }
        if (updatedGame.getLocation() != null) {
            dbGame.setLocation(updatedGame.getLocation());
        }
        if (updatedGame.getGameDateTime() != null) {
            dbGame.setGameDateTime(updatedGame.getGameDateTime());
        }
        if (updatedGame.isFull()) {
            dbGame.setFull(updatedGame.isFull());
        }
        if (updatedGame.getNumPlayers() > 0) {
            dbGame.setNumPlayers(updatedGame.getNumPlayers());
        }
        if (updatedGame.getParticipants() != null) {
            playerValidator.handlePlayers(updatedGame, dbGame);
        }
        return gameRepository.save(dbGame);
    }


    public void deleteGame(String gameId) {
        //notify all players
        gameRepository.deleteAll();
    }
}