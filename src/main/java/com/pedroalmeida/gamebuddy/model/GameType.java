package com.pedroalmeida.gamebuddy.model;

import jakarta.persistence.Table;


@Table
public enum GameType {

    FOOTBALL("Football", 22),
    PADEL("Padel", 2);

    private final String sportsName;
    private final int numPlayers;


    GameType(String sportsName, int numPlayers) {
        this.sportsName = sportsName;
        this.numPlayers = numPlayers;
    }
}