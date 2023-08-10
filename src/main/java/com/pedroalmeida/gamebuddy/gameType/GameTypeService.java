package com.pedroalmeida.gamebuddy.gameType;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class GameTypeService {
    public List<GameType> getGameTypes() {
        return Arrays.asList(GameType.FOOTBALL, GameType.PADEL);
    }
}
