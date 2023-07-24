package com.pedroalmeida.gamebuddy.service;

import com.pedroalmeida.gamebuddy.model.AppUser;
import com.pedroalmeida.gamebuddy.model.AppUserDTO;
import com.pedroalmeida.gamebuddy.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public List<AppUserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(appUser ->
                    AppUserDTO.builder().userId(appUser.getUserId()).name(appUser.getName()).build())
                .collect(Collectors.toList());
    }

    public AppUser addUser(AppUser appUser) {
        return userRepository.save(appUser);
    }
}