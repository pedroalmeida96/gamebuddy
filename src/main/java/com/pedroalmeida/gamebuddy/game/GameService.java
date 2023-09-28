package com.pedroalmeida.gamebuddy.game;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public List<Game> getAllGamesByAuthor(String author) {
        return gameRepository.findAllGamesByAuthor(author);
    }

    public Optional<Game> getGameById(Integer gameId) {
        return gameRepository.findById(gameId);
    }

    public Game createGame(Game game) {
        game.setNumPlayers(game.getParticipants().size());
        game.setFull(game.getNumPlayers() == game.getGameType().getMaxPlayers());
        if (CollectionUtils.isEmpty(game.getParticipants())) {
            throw new IllegalArgumentException("No participants");
        }
        if (game.getGameDateTime() == null || game.getGameDateTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Invalid game time date.");
        }
        return gameRepository.save(game);
    }

    public Game updateGame(Game updatedGame) {
        Game existingGame = gameRepository.getReferenceById(updatedGame.getGameId());
        existingGame.setGameType(updatedGame.getGameType());
        existingGame.setLocation(updatedGame.getLocation());
        existingGame.setGameDateTime(updatedGame.getGameDateTime());
        existingGame.setParticipants(updatedGame.getParticipants());
        return gameRepository.save(existingGame);
    }


    public void deleteGame(Integer gameId) {
        //notify all players
        gameRepository.deleteById(gameId);
    }

    public void deleteAll() {
        //notify all players
        gameRepository.deleteAll();
    }


}