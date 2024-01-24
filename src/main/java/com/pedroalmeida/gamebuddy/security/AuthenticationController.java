package com.pedroalmeida.gamebuddy.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.pedroalmeida.gamebuddy.appuser.AppUser;
import com.pedroalmeida.gamebuddy.infra.Result;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

import static com.pedroalmeida.gamebuddy.security.FilterToken.SECRET;

@RestController
@AllArgsConstructor
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public String login(@RequestBody Login login) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword());

        Authentication authenticate = this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        var user = (AppUser) authenticate.getPrincipal();

        return JWT.create()
                .withSubject(user.getUsername())
                .withClaim("id", user.getUserId())
                .withExpiresAt(LocalDateTime.now()
                        .plusMinutes(60)
                        .toInstant(ZoneOffset.of("+00:00"))
                )
                .sign(Algorithm.HMAC256(SECRET));

    }

    @PostMapping("/registration")
    public ResponseEntity<Result> registration(@RequestBody Login login) {
        authenticationService.registerUser(login);
        var result = Result.builder().message("New user added").build();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}

