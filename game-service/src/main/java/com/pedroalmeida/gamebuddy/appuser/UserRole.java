package com.pedroalmeida.gamebuddy.appuser;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum UserRole {

    ADMINISTRATOR("ADMINISTRATOR"),
    ROLE_USER("ROLE_USER");

    private final String role;

}