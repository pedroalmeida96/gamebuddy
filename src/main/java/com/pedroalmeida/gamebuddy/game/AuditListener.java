package com.pedroalmeida.gamebuddy.game;

import com.pedroalmeida.gamebuddy.security.JwtTokenUtils;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.util.Date;

public class AuditListener {

    @PrePersist
    public void setCreationTimestamp(Game game) {
        String loggedInUser = JwtTokenUtils.getCurrentLoggedInUser().getUsername();
        game.setAuthor(loggedInUser);
        game.setCreated(new Date());
        game.setUpdated(new Date());
        game.setCreatedBy(loggedInUser);
        game.setUpdatedBy(loggedInUser);
    }

    @PreUpdate
    public void setUpdateTimestamp(Game game) {
        String loggedInUser = JwtTokenUtils.getCurrentLoggedInUser().getUsername();
        game.setCreated(game.getCreated());
        game.setUpdated(new Date());
        game.setCreatedBy(game.getCreatedBy());
        game.setUpdatedBy(loggedInUser);
    }
}