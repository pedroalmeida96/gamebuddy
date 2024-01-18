package com.pedroalmeida.gamebuddy.appuser;

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

    public AppUserDTO getAppUser(Integer id) {
        return userRepository.findById(id)
                .map(appUserDTOMapper)
                .orElseThrow(() -> new AppUserNotFound(
                        "AppUser with id [%s] not found".formatted(id)
                ));
    }

    public AppUser getAppUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new AppUserNotFound(
                        "AppUser with username [%s] not found".formatted(username)
                ));
    }

    public AppUser addUser(AppUser appUser) {
        return userRepository.save(appUser);
    }
}