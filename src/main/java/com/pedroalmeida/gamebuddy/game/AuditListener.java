package com.pedroalmeida.gamebuddy.game;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.util.Date;

public class AuditListener {


    @PrePersist
    public void setCreationTimestamp(Game game) {
        game.setCreated(new Date());
        game.setUpdated(new Date());
    }

    @PreUpdate
    public void setUpdateTimestamp(Game game) {
        game.setCreated(game.getCreated());
        game.setUpdated(new Date());
    }
}