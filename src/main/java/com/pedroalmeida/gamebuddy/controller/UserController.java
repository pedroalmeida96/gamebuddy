package com.pedroalmeida.gamebuddy.controller;

import com.pedroalmeida.gamebuddy.model.AppUser;
import com.pedroalmeida.gamebuddy.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<AppUser> getAllStudents() {
        return userService.getAllUsers();
    }

    @PostMapping("/create")
    public void addStudent(@Valid @RequestBody AppUser appUser) {
        userService.addUser(appUser);
    }
}