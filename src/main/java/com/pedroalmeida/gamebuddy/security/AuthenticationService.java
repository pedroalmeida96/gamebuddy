package com.pedroalmeida.gamebuddy.security;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationService implements UserDetailsService {

    private final AuthenticationRepository authenticationRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AuthUser authUser = authenticationRepository.findByLogin(username);
        if (authUser == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return authUser;
    }

    public AuthUser registerUser(AuthUser authUser) {
        if (authenticationRepository.findByLogin(authUser.getUsername()) != null) {
            throw new UserAlreadyExistsException("Username already exists in db.");
        }
        authUser.setPassword(passwordEncoder.encode(authUser.getPassword()));
        return authenticationRepository.save(authUser);
    }
}
