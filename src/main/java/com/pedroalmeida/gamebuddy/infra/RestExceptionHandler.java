package com.pedroalmeida.gamebuddy.infra;

import com.pedroalmeida.gamebuddy.security.UserAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(UserAlreadyExistsException.class)
    private ResponseEntity<Result> userAlreadyExistsHandler(UserAlreadyExistsException exception) {
        var result = Result.builder().message(exception.getMessage()).build();
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
    }

}
