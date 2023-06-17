package com.pedroalmeida.gamebuddy.controller;

import com.pedroalmeida.gamebuddy.model.Game;
import com.pedroalmeida.gamebuddy.service.GameService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/games")
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;

    @GetMapping
    public List<Game> getAllGames() {
        log.debug("Request received to get all games");
        return gameService.getAllGames();
    }

    @GetMapping("/{gameId}")
    public Optional<Game> getGameById(@PathVariable UUID gameId) {
        log.debug("Request received to get game with ID: {}", gameId);
        return gameService.getGameById(gameId);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Game createGame(@Valid @RequestBody Game game) {
        log.debug("Request received to create a new game");
        return gameService.createGame(game);
    }

    @PutMapping("/update")
    public Game updateGame(@RequestBody Game game) {
        log.debug("Request received to update game with ID: {}", game.getGameId());
        return gameService.updateGame(game);
    }

    @DeleteMapping("/delete/{gameId}")
    public void deleteGame(@PathVariable UUID gameId) {
        log.debug("Request received to delete game with ID: {}", gameId);
        gameService.deleteGame(gameId);
    }
}