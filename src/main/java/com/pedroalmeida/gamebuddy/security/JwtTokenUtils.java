package com.pedroalmeida.gamebuddy.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class JwtTokenUtils {
    public static UserDetails getCurrentLoggedInUser() {

        UserDetails userDetails = null;

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            userDetails = ((UserDetails) principal);
        }

        return userDetails;
    }
}
