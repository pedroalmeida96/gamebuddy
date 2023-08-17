package com.pedroalmeida.gamebuddy.security;

import com.pedroalmeida.gamebuddy.appuser.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public String login(@RequestBody Login login) {
        return authenticationService.loginUser(login);
    }

    @PostMapping("/registration")
    public AppUser registration(@RequestBody Login login) {
        return authenticationService.registerUser(login);
    }
}

