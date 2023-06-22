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
        //Don't allow the same player 2 times
        //isFull and numPlayers only updatable via code
        Game dbGame = gameRepository.findById(updatedGame.getGameId()).orElseThrow(() -> new IllegalArgumentException("Game not found"));
        playerValidator.handlePlayers(updatedGame, dbGame);
        return gameRepository.save(updatedGame);
    }


    public void deleteGame(String gameId) {
        //notify all players
        gameRepository.deleteById(gameId);
    }
}