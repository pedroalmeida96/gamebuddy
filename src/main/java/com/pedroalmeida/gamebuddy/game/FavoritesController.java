package com.pedroalmeida.gamebuddy.game;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@RequestMapping(path = "api/favorites")
@RequiredArgsConstructor
public class FavoritesController {
    private final FavoritesService favoritesService;

    @PostMapping("/add")
    public ResponseEntity addFavorites(@RequestParam Integer gameId) {
        log.debug("Request received to add game to favorites");
        return favoritesService.addFavorites(gameId);
    }
}