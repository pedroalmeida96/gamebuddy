package com.pedroalmeida.gamebuddy.appuser;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(path = "api/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<AppUserDTO>> getAllUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @GetMapping("{userId}")
    public AppUserDTO getAppUser(@PathVariable("userId") Integer userId) {
        return userService.getAppUser(userId);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> addUser(@Valid @RequestBody AppUser appUser) {
        if (appUser.getUserId() != null) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "A new user cannot already have an ID");
        }
        return ResponseEntity.ok().body(userService.addUser(appUser));
    }
}