package com.pedroalmeida.gamebuddy.service;

import com.pedroalmeida.gamebuddy.model.AppUser;
import com.pedroalmeida.gamebuddy.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public List<AppUser> getAllUsers() {
        return userRepository.findAll();
    }

    public void addUser(AppUser appUser) {
        userRepository.save(appUser);
    }
}