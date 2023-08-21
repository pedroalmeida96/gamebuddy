package com.pedroalmeida.gamebuddy.game;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@RequestMapping(path = "api/games")
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;

    @GetMapping
    public List<Game> getAllGames() {
        log.debug("Request received to get all games");
        return gameService.getAllGames();
    }

    @GetMapping("/byAuthor")
    public List<Game> getAllGamesByAuthor(@RequestParam String author) {
        log.debug("Request received to get all games by author %s", author);
        return gameService.getAllGamesByAuthor(author);
    }

    @GetMapping("/{gameId}")
    public Optional<Game> getGameById(@PathVariable Integer gameId) {
        log.debug("Request received to get game with ID: {}", gameId);
        return gameService.getGameById(gameId);
    }

    @PostMapping("/create")
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
    public void deleteGame(@PathVariable Integer gameId) {
        log.debug("Request received to delete game with ID: {}", gameId);
        gameService.deleteGame(gameId);
    }

    @DeleteMapping("/delete")
    public void deleteAll() {
        gameService.deleteAll();
    }
}