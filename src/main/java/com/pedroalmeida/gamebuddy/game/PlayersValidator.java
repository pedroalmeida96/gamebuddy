package com.pedroalmeida.gamebuddy.game;

import com.pedroalmeida.gamebuddy.appuser.AppUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class PlayersValidator {
    public Game handlePlayers(Game updatedGame, Game oldGame) {
        List<AppUser> allParticipants = new ArrayList<>(oldGame.getParticipants());
        allParticipants.addAll(updatedGame.getParticipants());
        Set<AppUser> uniqueParticipants = new HashSet<>(allParticipants);
        updatedGame.setParticipants(new ArrayList<>(uniqueParticipants));
        updatedGame.setNumPlayers(uniqueParticipants.size());
        return updatedGame;
    }
}
