package com.pedroalmeida.gamebuddy.controller;

import com.pedroalmeida.gamebuddy.model.GameType;
import com.pedroalmeida.gamebuddy.service.GameTypeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/gameType")
@RequiredArgsConstructor
public class GameTypeController {
    /**
    private final GameTypeService gameTypeService;

    @GetMapping
    public List<GameType> getAllGameTypes() {
        log.debug("GET request from gamebuddy-svc to retrieve all game types");
        return gameTypeService.getGameTypes();
    }
    **/
}