package com.pedroalmeida.gamebuddy.security;

import com.pedroalmeida.gamebuddy.appuser.AppUser;
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
}
