package com.pedroalmeida.gamebuddy.gameType;

import lombok.Getter;

@Getter
public enum GameType {

    FOOTBALL("Football", 22),
    PADEL("Padel", 2);

    private final String sportsName;
    private final int maxPlayers;


    GameType(String sportsName, int maxPlayers) {
        this.sportsName = sportsName;
        this.maxPlayers = maxPlayers;
    }
}