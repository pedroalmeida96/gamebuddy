package com.pedroalmeida.gamebuddy.security;

import com.pedroalmeida.gamebuddy.appuser.AppUser;
import com.pedroalmeida.gamebuddy.appuser.UserRole;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.server.ResponseStatusException;

public class SecurityUtils {

    public static UserDetails getCurrentLoggedInUser() {

        UserDetails userDetails = null;

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            userDetails = ((UserDetails) principal);
        }

        return userDetails;
    }

    public static void isAdministrator() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof AppUser authenticatedUser)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }
        if (!authenticatedUser.getRoles().contains(UserRole.ADMINISTRATOR.getRole())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not administrator");
        }
    }
}
