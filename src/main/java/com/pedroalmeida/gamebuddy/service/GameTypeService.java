package com.pedroalmeida.gamebuddy.service;

import com.pedroalmeida.gamebuddy.model.GameType;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class GameTypeService {
    public List<GameType> getGameTypes() {
        return Arrays.asList(GameType.FOOTBALL, GameType.PADEL);
    }
}
