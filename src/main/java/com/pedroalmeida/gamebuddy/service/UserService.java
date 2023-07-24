package com.pedroalmeida.gamebuddy.service;

import com.pedroalmeida.gamebuddy.exception.ResourceNotFoundException;
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
    private final AppUserDTOMapper appUserDTOMapper;

    public List<AppUserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(appUserDTOMapper)
                .collect(Collectors.toList());
    }

    public AppUserDTO getAppUser(String id) {
        return userRepository.findById(id)
                .map(appUserDTOMapper)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "AppUser with id [%s] not found".formatted(id)
                ));
    }

    public AppUser addUser(AppUser appUser) {
        return userRepository.save(appUser);
    }
}