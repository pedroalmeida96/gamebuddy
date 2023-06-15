package com.pedroalmeida.gamebuddy.controller;

import com.pedroalmeida.gamebuddy.model.Game;
import com.pedroalmeida.gamebuddy.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/games")
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;

    @GetMapping
    public List<Game> getAllGames() {
        log.debug("Retrieving all games");
        return gameService.getAllGames();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Game createGame(@RequestBody Game game) {
        return gameService.createGame(game);
    }

    @PutMapping("/{id}")
    public Game updateGame(@PathVariable String id, @RequestBody Game game) {
        return gameService.updateGame(game);
    }

    @DeleteMapping("/{id}")
    public void deleteGame(@PathVariable UUID id) {
        gameService.deleteGame(id);
    }
}
