package com.pedroalmeida.gamebuddy.service;

import com.pedroalmeida.gamebuddy.exception.GameFullException;
import com.pedroalmeida.gamebuddy.model.AppUser;
import com.pedroalmeida.gamebuddy.model.Game;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameLotationValidator {
    public boolean validateMaxPlayers(Game game) {
        if (game.getNumPlayers() >= game.getGameType().getMaxPlayers()) {
            throw new GameFullException("Game is full");
        }
        return true;
    }

    public void handlePlayers(Game game, Optional<Game> dbGame) {
        Game actualGame = dbGame.orElseThrow(() -> new IllegalArgumentException("Game not found"));
        List<AppUser> participantsToAdd = new ArrayList<>();
        game.getParticipants().forEach(p -> {
            boolean playerExists = actualGame.getParticipants().stream()
                    .map(AppUser::getUserId)
                    .anyMatch(userId -> userId.equals(p.getUserId()));
            if (!playerExists) {
                participantsToAdd.add(p);
            }
        });
        actualGame.getParticipants().addAll(participantsToAdd);
    }
}
