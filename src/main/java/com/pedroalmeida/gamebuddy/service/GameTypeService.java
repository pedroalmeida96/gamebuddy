package com.pedroalmeida.gamebuddy.service;

import com.pedroalmeida.gamebuddy.model.GameType;

import java.util.Arrays;
import java.util.List;

public class GameTypeService {
    public List<GameType> getGameTypes() {
        return Arrays.asList(GameType.FOOTBALL, GameType.PADEL);
    }
}
