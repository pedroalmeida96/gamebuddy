package com.pedroalmeida.gamebuddy.security;

import org.springframework.security.core.context.SecurityContextHolder;

public class JwtTokenUtils {
    public static String getCurrentLoggedInUser() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
