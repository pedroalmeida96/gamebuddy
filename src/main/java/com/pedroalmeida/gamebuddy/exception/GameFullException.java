package com.pedroalmeida.gamebuddy.exception;

public class GameFullException extends RuntimeException {
    public GameFullException(String message) {
        super(message);
    }
}
