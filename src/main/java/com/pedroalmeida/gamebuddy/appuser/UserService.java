package com.pedroalmeida.gamebuddy.appuser;

import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.server.ResponseStatusException;

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

    public AppUser updateUser(AppUser authenticatedUser, AppUser appUser) {
        if (!authenticatedUser.getRoles().contains(UserRole.ADMINISTRATOR.getRole())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not administrator");
        }

        AppUser existingUser = userRepository.findById(appUser.getUserId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Set<String> newRoles = new HashSet<>(existingUser.getRoles());
        newRoles.add(UserRole.ADMINISTRATOR.getRole());
        existingUser.setRoles(newRoles);

        return userRepository.save(existingUser);
    }
}