package com.pedroalmeida.gamebuddy.game;

import com.pedroalmeida.gamebuddy.appuser.AppUser;
import com.pedroalmeida.gamebuddy.appuser.UserService;
import com.pedroalmeida.gamebuddy.security.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class FavoritesService {

    private final GameService gameService;
    private final UserService appUserService;

    public ResponseEntity addFavorites(Integer gameId) {

        UserDetails loggedInUser = JwtTokenUtils.getCurrentLoggedInUser();
        AppUser appUser = appUserService.getAppUserByUsername(loggedInUser.getUsername());

        Optional<Game> optionalGame = gameService.getGameById(gameId);
        Game game = optionalGame.get();

        if (Objects.isNull(game.getFavorites())) {
            game.setFavorites(new HashSet<>());
        }

        Set<String> favorites = game.getFavorites();
        if (favorites.contains(appUser.getUsername())) {
            favorites.remove(appUser.getUsername());
        } else {
            favorites.add(appUser.getUsername());
        }

        gameService.updateGame(game);
        return ResponseEntity.ok("Success");
    }
}