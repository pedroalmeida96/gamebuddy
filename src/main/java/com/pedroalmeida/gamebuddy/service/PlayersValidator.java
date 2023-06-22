package com.pedroalmeida.gamebuddy.service;

import com.pedroalmeida.gamebuddy.exception.GameFullException;
import com.pedroalmeida.gamebuddy.model.AppUser;
import com.pedroalmeida.gamebuddy.model.Game;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class PlayersValidator {
    public void handlePlayers(Game updatedGame, Game dbGame) {
        List<AppUser> playersToAdd = dbGame.getParticipants().stream()
                .filter(p -> updatedGame.getParticipants().stream()
                        .noneMatch(updatedP -> updatedP.getUserId().equals(p.getUserId())))
                .collect(Collectors.toList());

        if (dbGame.getNumPlayers() + playersToAdd.size() < dbGame.getGameType().getMaxPlayers()) {
            updatedGame.getParticipants().addAll(playersToAdd);
            updatedGame.setNumPlayers(updatedGame.getNumPlayers() + 1);
        } else {
            throw new GameFullException("Game is full");
        }
    }
}
