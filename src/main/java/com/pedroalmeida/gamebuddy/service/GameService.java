package com.pedroalmeida.gamebuddy.service;

import com.pedroalmeida.gamebuddy.model.Game;
import com.pedroalmeida.gamebuddy.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;

    public List<Game> getAllGames() {
        return (List<Game>) gameRepository.findAll();
    }

    public Optional<Game> getGameById(Long gameId) {
        return gameRepository.findById(gameId);
    }

    public Game createGame(Game game) {
        if (game.getGameDateTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("The game date time must be in the future.");
        }
        return gameRepository.save(game);
    }

    public Game updateGame(Game game) {
        return gameRepository.save(game);
    }

    public void deleteGame(Long gameId) {
        gameRepository.deleteById(gameId);
    }
}