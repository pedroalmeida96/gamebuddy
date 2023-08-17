package com.pedroalmeida.gamebuddy.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.pedroalmeida.gamebuddy.appuser.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

import static com.pedroalmeida.gamebuddy.security.FilterToken.SECRET;

@Service
@AllArgsConstructor
public class AuthenticationService implements UserDetailsService {

    private final AuthenticationManager authenticationManager;
    private final AuthenticationRepository authenticationRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = authenticationRepository.findByUsername(username);
        if (appUser == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return appUser;
    }

    public AppUser registerUser(Login login) {
        AppUser appUser = AppUser.builder().username(login.getUsername()).name(login.getName()).password(login.getPassword()).build();
        if (authenticationRepository.findByUsername(appUser.getUsername()) != null) {
            throw new UserAlreadyExistsException("Username already exists in db.");
        }
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        return authenticationRepository.save(appUser);
    }

    public String loginUser(Login login) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword());
        Authentication authenticate = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        var usuario = (AppUser) authenticate.getPrincipal();
        return JWT.create()
                .withSubject(usuario.getUsername())
                .withClaim("id", usuario.getUserId())
                .withExpiresAt(LocalDateTime.now()
                        .plusMinutes(60)
                        .toInstant(ZoneOffset.of("+01:00"))
                )
                .sign(Algorithm.HMAC256(SECRET));
    }
}
