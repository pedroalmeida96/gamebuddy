package com.pedroalmeida.gamebuddy.appuser;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class AppUserNotFound extends RuntimeException {

    public AppUserNotFound(String message) {
        super(message);
    }
}