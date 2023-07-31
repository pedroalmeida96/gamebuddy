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
    public void handlePlayers(Game updatedGame, Game dbGame) {
        List<AppUser> allParticipants = new ArrayList<>(dbGame.getParticipants());
        allParticipants.addAll(updatedGame.getParticipants());
        Set<AppUser> uniqueParticipants = new HashSet<>(allParticipants);
        dbGame.setParticipants(new ArrayList<>(uniqueParticipants));
        dbGame.setNumPlayers(uniqueParticipants.size());
    }
}
