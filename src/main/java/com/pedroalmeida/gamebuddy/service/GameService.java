package com.pedroalmeida.gamebuddy.service;

import com.pedroalmeida.gamebuddy.model.Game;
import com.pedroalmeida.gamebuddy.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game createGame(Game game) {
        return gameRepository.save(game);
    }

    public Game updateGame(Game game) {
        return gameRepository.save(game);
    }

    public void deleteGame(UUID id) {
        gameRepository.deleteById(id);
    }
}