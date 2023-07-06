package com.pedroalmeida.gamebuddy.service;

import com.pedroalmeida.gamebuddy.exception.GameFullException;
import com.pedroalmeida.gamebuddy.model.AppUser;
import com.pedroalmeida.gamebuddy.model.Game;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
