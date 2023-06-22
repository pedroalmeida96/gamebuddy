package com.pedroalmeida.gamebuddy.service;

import com.pedroalmeida.gamebuddy.model.Game;
import com.pedroalmeida.gamebuddy.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameService {
    private final GameLotationValidator gameLotationValidator;
    private final GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Optional<Game> getGameById(String gameId) {
        return gameRepository.findById(gameId);
    }

    public Game createGame(Game game) {
        if (game.getGameDateTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("The game date time must be in the future.");
        }
        return gameRepository.save(game);
    }

    public Game updateGame(Game game) {
        //Don't allow the same player 2 times
        //isFull and numPlayers only updatable via code
        Optional<Game> dbGame = gameRepository.findById(game.getGameId());
        gameLotationValidator.handlePlayers(game, dbGame);
        return game;
    }

    public void deleteGame(String gameId) {
        //notify all players
        gameRepository.deleteById(gameId);
    }
}